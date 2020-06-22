import React, { useState } from 'react'; 
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/auth'
import { GrFormClose } from 'react-icons/gr'

import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/FormikField";

import './styles.css';  //Importa o css

import Footer from '../../partials/Footer/Footer'
import logo from '../../assets/Logo.png';

interface FormValues {
    email: string;
    password: string;
}
  
const initialValues: FormValues = {
    email: "",
    password: ""
};

const SigninSchema = Yup.object().shape({
    email: Yup.string()
        .required("Obrigatório"),
    password: Yup.string()
        .required("Obrigatório"),
});

const Login: React.FC = () =>
{

    const { signIn } = useAuth();

    const [userError, setUserError] = useState<boolean>(false);


    function handleCloseUserError()
    {
        setUserError(false);
    }

    function handleUserError()
    {
        if(userError)
            return(
                <div className="login-error">
                    <div className="text-error">
                        Usuário ou senha incorretos.<br/> Tente novamente  
                    </div>                  
                    <button className="close-button" onClick={handleCloseUserError}>
                        <span><GrFormClose size={30}/></span>
                    </button>
                </div>
            );
    }

    const handleSignIn = (values: FormValues): void => 
    {
        signIn(values.email, values.password)
            .then((res) => {
                console.log(!res)
                setUserError(!res);
            })
            .catch(()=> { setUserError(true); })
    }

    return(
        <div id="page-login">
            <body>
            </body>
                <header>
                    <img src={logo} alt="Logomarca" />
                </header>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSignIn}
                    validationSchema={SigninSchema}
                >
                {() => {
                    return (
                        <Form className="form">
                            <h1>Login</h1>
                            {handleUserError()}

                            <FormikField name="email" label="Email"/>
                            <div className="field">
                                <FormikField name="password" label="Senha" type="password"/>
                                <Link to="/user/reset">Esqueci minha senha</Link>
                            </div>

                            <button className="form-button" type="submit">Login</button>
                            <Link to="/user/register">
                                <span>Criar conta</span>
                            </Link>
                        </Form>
                    );
                }}
                </Formik>
                <Footer />
        </div>
    );
};

export default Login;