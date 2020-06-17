import React, { useState, useEffect }from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa'
import logo from '../../assets/Logo.png';

import { useAuth } from '../../contexts/auth'

interface HeaderProps{
    title?: string,
}

interface User
{
    email: string;
    name: string;
}

// Componente escrito em formato de função (React.FC)
const Header: React.FC<HeaderProps> = (props) =>
{
    const { user, signOut } = useAuth();

    function handleLogOut(){
        signOut();
    }
    
    // Talvez dê para fazer um novo componente com isso
    function userInfo(){

        if(!user)
            return (
                <div className="user-area">
                    <div className="user">
                        <span><FaUserCircle size="60"/> </span>
                        <Link to="/login">Cadastre-se ou <br/>faça seu login</Link>
                    </div>
                    <Link to="#" className="carrinho">
                        <span> <GiShoppingCart size="60" /></span>
                        Carrinho
                    </Link>
                </div>
            );
        else
            return (
                <div className="user-area">
                    <div className="user">
                        <span><FaUserCircle size="60"/> </span>
                        <div className="name-logout">
                            <div className="user-name">{user.name}</div>
                            <Link to="" onClick={handleLogOut}>Logout</Link>
                        </div>
                    </div>
                    <Link to="/buying" className="carrinho">
                        <span> <GiShoppingCart size="60" /></span>
                        Carrinho
                    </Link>
                </div>
            );
    }

    return(
    <header>
        <div className = "top">
            <Link to="">Home</Link>
            <Link to="">Quem somos</Link>
            <Link to="">Contato</Link>
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

            {userInfo()}

        </div>
        <div className="bottom-menu">
            <p>Menu para escolher a pesquisa por conteúdo específico</p>
        </div>
    </header>
    );
}

export default Header;