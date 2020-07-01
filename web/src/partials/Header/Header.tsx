import React, { useState, useEffect }from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa'
import { MdMenu, MdKeyboardArrowDown } from 'react-icons/md'
import logo from '../../assets/Logo.png';

import { useAuth } from '../../contexts/auth'

// É o Header que é utilizado na maioria das páginas

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
                        <Link to="/user/login">Cadastre-se ou <br/>faça seu login</Link>
                    </div>
                    <Link to="/user/login" className="carrinho">
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
                    <Link to="/user/cart" className="carrinho">
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
                <Link to='/'>
                    <img src={logo} alt="Logomarca" />
                </Link>
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
            <div className="items">
                    <div className="categories">
                        <span className="menu"> <MdMenu size="24" /></span>
                        <div className="text">Categorias</div>
                        <span className="arrow"><MdKeyboardArrowDown size="15"/></span>
                    </div>
                <Link to="/bancos">
                    <div className="first-categorie">
                        Bancos
                    </div>
                </Link>
                <Link to="/tecidos">
                    <div className="second-categorie">
                        Tecidos
                    </div>
                </Link>
                <Link to="/tapetes">
                    <div className="third-categorie">
                        Tapetes
                    </div>
                </Link>
            </div>
        </div>
    </header>
    );
}

export default Header;