import React, { useContext } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import logo from '../../assets/Logo.png';

import AuthContext from '../../contexts/auth'


interface HeaderProps{
    title?: string,
}

// Componente escrito em formato de função (React.FC)
const Header: React.FC<HeaderProps> = (props) =>
{

    const { signed, user, signIn } = useContext(AuthContext);

    console.log(signed);
    console.log(user);

    function handleSignIn() //Verifica se o usuário e senha digitados estão cadastrados no banco
    {
        signIn();
    }









    return(
    <header>
        <div className = "top">
            <Link to="">Home</Link>
            <Link to="">Quem somos</Link>
            <Link to="">Contato</Link>
            <Link to="" onClick={handleSignIn}>Cadastre-se / Login</Link>
        </div>
        <div className="middle">
            <div className="logo-search">
                <img src={logo} alt="Logomarca" />    {/* Ver oq fazer com as imagens */}
                <form id="form2" action="">
                    <div className="search-field">
                        <input type="text" name="search-box" placeholder="Buscar" />
                        <button>
                            <span> <FiSearch size={20}/> </span>
                        </button>
                    </div>
                </form>
            </div>
            <Link to="" className="carrinho">
                <span> <GiShoppingCart size="60" /></span>
                Carrinho
            </Link>
        </div>
        <div className="bottom-menu">
            <p>Menu para escolher a pesquisa por conteúdo específico</p>
        </div>
    </header>
    );
}

export default Header;