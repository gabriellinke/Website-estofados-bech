import React, { useState } from "react";
import check from '../../assets/check.svg';
import errIcon from '../../assets/xred.svg';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/FormikField";
import { Link, useHistory } from "react-router-dom";
import api from '../../services/api'
import Footer from '../../partials/Footer/Footer'
import logo from '../../assets/Logo.png';

import "./styles.css";

// Tipagem dos valores
interface FormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeat_password: string;
}

// Valores iniciais
const initialValues: FormValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  repeat_password: ""
};

// Esquema de validação
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .required("Obrigatório"),
    surname: Yup.string()
        .required("Obrigatório"),
    email: Yup.string()
        .lowercase()
        .email("Email inválido!")
        .required("Obrigatório"),
    password: Yup.string()
        .matches(/(?=.*[a-z])/, "A senha precisa ter ao menos uma letra")
        .matches(/(?=.*[0-9])/, "A senha precisa ter ao menos um número")
        .min(6, "A senha precisa ter ao menos 6 caracteres")
        .required("Obrigatório"),
    repeat_password: Yup.string()
        .oneOf([Yup.ref('password')], "As senhas precisam ser iguais")
        .required("Obrigatório"),
});

const RegisterFormik: React.FC = () => 
{
  // Usado para possibilitar o redirecionamento
  const history = useHistory();
  const [situation, setSituation] = useState<string>("hide");

  // Se o registro der errado é mostrada uma mensagem de erro.
  // Se der certo, é mostrada uma mensagem de sucesso e o usuário é redirecionado para a página de login
  const handleSubmit = (values: FormValues): void => {
    api.post('/user/register', values)
        .then(() => {
          setSituation("ok");
          setTimeout(() => {
            setSituation("hide");
            history.push('/user/login')
        }, 2000)
        })
        .catch(() => {
          setSituation("error");
          setTimeout(() => {
            setSituation("hide");
        }, 2000)
        })
  };

  // Mostra o modal de erro/sucesso
  function handleRegister()
  {
      if(situation === 'error')
          return(
              <div id="modal" className={situation}>
              <div className="content">
                <div className="header">
                    <img src={errIcon} width='50px' alt="Cadastro concluído"></img>
                    <h1>Email já cadastrado</h1>
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
                  <h1>Conta cadastrada com sucesso</h1>
              </div>
            </div>
          </div>
          );
  }

  return (
    <div id="page-register">
      <div className="RegisterFormik">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SignupSchema}
        >
          {() => {
            return (
              <div>
                  <body></body>
                  <header>
                      <img src={logo} alt="Logomarca" />
                  </header>
                  <Form className="form">
                      <h1>Cadastre-se</h1>
                      <FormikField name="name" label="Nome"/>
                      <FormikField name="surname" label="Sobrenome"/>
                      <FormikField name="email" label="Email"/>
                      <FormikField name="password" label="Senha " type="password"/>
                      <FormikField name="repeat_password" label="Confirme a senha" type="password" />

                      <button type="submit">
                        Cadastre-se
                      </button>
                      <Link to="/user/login">
                            <span>Já tenho uma conta</span>
                      </Link>
                  </Form>
                  <Footer />

                  {handleRegister()}

              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterFormik;