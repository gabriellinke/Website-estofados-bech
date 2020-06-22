import React, { useState } from 'react'; 
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/auth'
import { GrFormClose } from 'react-icons/gr'
import api from '../../services/api'

import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/FormikField";

import './styles.css';  //Importa o css

import Footer from '../../partials/Footer/Footer'
import logo from '../../assets/Logo.png';

interface FormValues {
    email: string;
}
  
const initialValues: FormValues = {
    email: "",
};

const SigninSchema = Yup.object().shape({
    email: Yup.string()
        .required("Obrigatório")
        .email("Insira um email válido"),
});

const Login: React.FC = () =>
{
    const [resetError, setResetError] = useState<string>("");

    function handleCloseReset()
    {
        setResetError("");
    }

    function handleResetError()
    {
        if(resetError === "error")
            return(
                <div className="reset-error">
                    <div className="text-error">
                        Email não cadastrado 
                    </div>                  
                    <button className="close-button" onClick={handleCloseReset}>
                        <span><GrFormClose size={30}/></span>
                    </button>
                </div>
            );
        else if(resetError === "ok")
            return (
                <div className="reset-ok">
                    <div className="text-error">
                        Um email foi enviado
                    </div>
                    <button className="close-button" onClick={handleCloseReset}>
                        <span><GrFormClose size={30}/></span>
                    </button>
                </div>
            );
    }

    const handleReset = (values: FormValues): void => 
    {
        api.post('/user/reset', { email: values.email})
            .then((res) => {
                if(res.data.resposta)
                    setResetError("ok");
                else
                    setResetError("error");
            })
            .catch((res) => {
                console.log(res)
            })
    }

    return(
        <div id="page-reset">
            <body>
            </body>
                <header>
                    <img src={logo} alt="Logomarca" />
                </header>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleReset}
                    validationSchema={SigninSchema}
                >
                {() => {
                    return (
                        <Form className="form">
                            <h1>Mudar minha senha</h1>
                            {handleResetError()}

                            <p>Será enviado um email para que você possa alterar a sua senha.</p>

                            <FormikField name="email" label="Email"/>    
                            <button className="form-button" type="submit">Enviar email</button>
                        </Form>
                    );
                }}
                </Formik>
                <Footer />
        </div>
    );
};

export default Login;