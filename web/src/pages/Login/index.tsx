import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/auth'

import './styles.css';  //Importa o css


const Login = () =>
{

    const { signed, user, signIn } = useAuth();

    console.log(signed);
    console.log(user);

    function handleSignIn() //Verifica se o usuário e senha digitados estão cadastrados no banco
    {
        signIn();
    }

    return(
        <div id="page-login">
            <div className="field">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email"/>
            </div>
            <div className="field">
                <label htmlFor="password">Senha</label>
                <input type="text" name="password" id="password"/>
            </div>
            <Link to='/buying' onClick={handleSignIn}>
                Login
            </Link>
        </div>
    );
};

export default Login;