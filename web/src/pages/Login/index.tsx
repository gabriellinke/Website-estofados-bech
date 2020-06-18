import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react'; 
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/auth'

import './styles.css';  //Importa o css
import { stringify } from 'querystring';


const Login = () =>
{

    const { signIn } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        const { value } = event.target;

        setEmail(value);
    }

    function handlePasswordInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        const { value } = event.target;

        setPassword(value);
    }

    function handleSignIn(event: FormEvent<HTMLFormElement>) //Verifica se o usuário e senha digitados estão cadastrados no banco
    {
        event.preventDefault();
        signIn(email, password);
    }

    return(
        <div id="page-login">
            <form onSubmit={handleSignIn}>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={handleEmailInputChange}/>
                </div>
                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input type="text" name="password" id="password" onChange={handlePasswordInputChange}/>
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;