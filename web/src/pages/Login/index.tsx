import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react'; 
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/auth'
import { GrFormClose } from 'react-icons/gr'

import './styles.css';  //Importa o css

import Footer from '../../partials/Footer/Footer'
import logo from '../../assets/Logo.png';

const Login = () =>
{

    const { signIn } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userError, setUserError] = useState<boolean>(false);

    function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        setEmail(event.target.value);
    }

    function handlePasswordInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        setPassword(event.target.value);
    }

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

    async function handleSignIn(event: FormEvent<HTMLFormElement>) //Verifica se o usuário e senha digitados estão cadastrados no banco
    {
        event.preventDefault();
        var confirm = await signIn(email, password);

        if(!confirm)
            setUserError(true);
        else
            console.log("Voce está logado")
    }

    return(
        <div id="page-login">
            <body>
            </body>
                <header>
                    <img src={logo} alt="Logomarca" />
                </header>
                <form onSubmit={handleSignIn}>
                    <h1>Login</h1>

                    {handleUserError()}

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={handleEmailInputChange}/>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" onChange={handlePasswordInputChange}/>
                        <a href="#">Esqueci minha senha</a>
                    </div>
                    <button className="form-button">Login</button>
                    <Link to="/user/register">
                        <span>Criar conta</span>
                    </Link>
                </form>
                <Footer />
        </div>
    );
};

export default Login;