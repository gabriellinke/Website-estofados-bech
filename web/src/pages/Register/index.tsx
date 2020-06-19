import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react'; 
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/auth'
import api from '../../services/api'
import { GrFormClose } from 'react-icons/gr'

import './styles.css';  //Importa o css

import Footer from '../../partials/Footer/Footer'
import logo from '../../assets/Logo.png';

const Login = () =>
{

    const { signIn } = useAuth();

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeat_password, setRepeat_password] = useState<string>("");

    const [userError, setUserError] = useState<boolean>(false);

    function handleNameInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        setName(event.target.value);
    }

    function handleSurnameInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        setSurname(event.target.value);
    }

    function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        setEmail(event.target.value);
    }

    function handlePasswordInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        setPassword(event.target.value);
    }

    function handleConfirmPasswordInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        setRepeat_password(event.target.value);
    }

    async function handleSignUp(event: FormEvent<HTMLFormElement>) //Verifica se o usuário e senha digitados estão cadastrados no banco
    {
        event.preventDefault();
        try{
            const response = await api.post('/user/register', {name, surname, email, password, repeat_password});
            console.log(response);
        }
        catch(err)
        {
            alert(err)
        }
    }

    return(
        <div id="page-login">
            <body>
            </body>
                <header>
                    <img src={logo} alt="Logomarca" />
                </header>
                <form onSubmit={handleSignUp}>
                    <h1>Cadastre-se</h1>

                    {/* {handleUserError()} */}

                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input type="text" name="name" id="name" onChange={handleNameInputChange} required/>
                    </div>
                    <div className="field">
                        <label htmlFor="surname">Sobrenome</label>
                        <input type="text" name="surname" id="surname" onChange={handleSurnameInputChange} required/>
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={handleEmailInputChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" onChange={handlePasswordInputChange} required minLength={6}/>
                    </div>                    
                    <div className="field">
                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleConfirmPasswordInputChange} required minLength={6}/>
                    </div>
                    <button className="form-button">Cadastre-se</button>
                    <Link to="/user/login">
                        <span>Já tenho uma conta</span>
                    </Link>
                </form>
                <Footer />
        </div>
    );
};

export default Login;