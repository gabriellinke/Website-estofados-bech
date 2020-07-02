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

const Header: React.FC<HeaderProps> = (props) =>
{
    const { user, signOut } = useAuth();

    // Estados para saber se deve mostrar o menu de categorias
    const [show, setShow] = useState<boolean>(false)
    const [overMenu, setOverMenu] = useState<boolean>(false)
    const [overOptions, setOverOptions] = useState<boolean>(false)

    // Desloga o usuário
    function handleLogOut(){
        signOut();
    }
    
    // Informações do usuário. Muda se o usuário ta logado ou não.
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

    // Usado para saber se deve mostrar o menu de categorias
    useEffect(() => {
        setTimeout(() => {
            if(!overOptions && !overMenu)
                setShow(false)
        }, 100)
    }, [overMenu, overOptions])

    // Usado para saber se deve mostrar o menu de categorias
    function handleOverMenu()
    {
        setOverMenu(true);
        setShow(true);
    }

    // Usado para saber se deve mostrar o menu de categorias
    function handleOverOptions()
    {
        setOverOptions(true);
        setShow(true);
    }


    function categoriesOptions()
    {
        if(show)
            return(
                <div className="categories-options" onMouseEnter={handleOverOptions} onMouseLeave={() => setOverOptions(false)}>
                    <Link to='/category/bancos' className="options">
                        <div className="first-option">Bancos</div>
                    </Link>
                    <Link to='/category/tecidos' className="options">
                        <div className="second-option">Tecidos</div>
                    </Link>
                    <Link to='/category/tapetes' className="options">
                        <div className="third-option">Tapetes</div>
                    </Link>
                </div>
            )
    }

    return(
    <header>
        <div className = "top">
            <Link to="/">Home</Link>
            <Link to="">Quem somos</Link>
            <Link to="">Contato</Link>
        </div>
        <div className="middle">
            <div className="logo-search">
                <Link to='/'>
                    <img src={logo} alt="Logomarca" />
                </Link>
                <form id="form2" action="/search">
                    <div className="search-field">
                        <input type="text" name="search" placeholder="Buscar" />
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
                <div className="categories-menu">
                    <Link to="#" onMouseEnter={handleOverMenu} onMouseLeave={() => setOverMenu(false)}>
                        <div className="categories">
                            <span className="menu"> <MdMenu size="24" /></span>
                            <div className="text">Categorias</div>
                            <span className="arrow"><MdKeyboardArrowDown size="15"/></span>
                        </div>
                    </Link>
                    {categoriesOptions()}
                </div>
                <Link to="/category/bancos">
                    <div className="first-categorie">
                        Bancos
                    </div>
                </Link>
                <Link to="/category/tecidos">
                    <div className="second-categorie">
                        Tecidos
                    </div>
                </Link>
                <Link to="/category/tapetes">
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