import React, { useState } from 'react';
import api from '../../services/api'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/FormikField";
import Footer from '../../partials/Footer/Footer'
import logo from '../../assets/Logo.png';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import check from '../../assets/check.svg';
import errIcon from '../../assets/xred.svg';

import './styles.css';  //Importa o css

interface FormValues {
    password: string;
    repeat_password: string;
}
  
const initialValues: FormValues = {
    password: "",
    repeat_password: "",
};

const VerifyEmailSchema = Yup.object().shape({
    password: Yup.string()
        .matches(/(?=.*[a-z])/, "A senha precisa ter ao menos uma letra")
        .matches(/(?=.*[0-9])/, "A senha precisa ter ao menos um número")
        .min(6, "A senha precisa ter ao menos 6 caracteres")
        .required("Obrigatório"),
    repeat_password: Yup.string()
        .oneOf([Yup.ref('password')], "As senhas precisam ser iguais")
        .required("Obrigatório"),
});

const Login: React.FC = () =>
{
    // Usado para possibilitar o redirecionamento
    const history = useHistory();
    const [situation, setSituation] = useState<string>("hide");

    let { token } = useParams();
    // Dá um POST para a API, que envia um email pra recuperação de senha se o email estiver cadastrado
    const handleReset = (values: FormValues): void => 
    {
        api.post('user/reset_password/'+token, {password: values.password})
            .then(response => {
                if(response.data > 0)
                {
                    setSituation("ok");
                    setTimeout(() => {
                        setSituation("hide");
                        history.push('/user/login')
                  }, 2000)
                }
                else
                {
                    setSituation("error");
                    setTimeout(() => {
                        setSituation("hide");
                        history.push('/user/reset');
                    }, 3000)
                }
            })
            .catch(err => {
                console.log(err);
                setSituation("error");
                setTimeout(() => {
                    setSituation("hide");
                    history.push('/user/reset');
                }, 2000)
            })
    }

    // Mostra o modal de erro/sucesso
    function handleRegister()
    {
        if(situation == 'error')
            return(
                <div id="modal" className={situation}>
                <div className="content">
                <div className="header">
                    <img src={errIcon} width='50px' alt="Cadastro concluído"></img>
                    <h1>Não foi possível alterar a senha. Requisite uma nova senha novamente</h1>
                </div>
                </div>
            </div>
            );
        else
            return(
            <div id="modal" className={situation}>
            <div className="content">
                <div className="header">
                    <img src={check} alt="Cadastro concluído"></img>
                    <h1>Senha alterada com sucesso</h1>
                </div>
            </div>
            </div>
            );
    }

    return(
        <div id="page-reset-password">
            <body>
            </body>
                <header>
                    <img src={logo} alt="Logomarca" />
                </header>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleReset}
                    validationSchema={VerifyEmailSchema}
                    >
                {() => {
                    return (
                        <Form className="form">
                            <h1>Mudar minha senha</h1>
                            <p>Cadastre a sua nova senha</p>
                            <FormikField name="password" label="Senha " type="password"/>
                            <FormikField name="repeat_password" label="Confirme a senha" type="password" />
                            <button className="form-button" type="submit">Alterar senha</button>
                        </Form>
                    );
                }}
                </Formik>
                <Footer />
                {handleRegister()}
        </div>
    );
};

export default Login;