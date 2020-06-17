import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa'
import logo from '../../assets/Logo.png';

interface HeaderProps{
    title?: string,
}

// Componente escrito em formato de função (React.FC)
const Header: React.FC<HeaderProps> = (props) =>
{
    return(
    <header>
        <div className = "top">
            <Link to="">Home</Link>
            <Link to="">Quem somos</Link>
            <Link to="">Contato</Link>
            <Link to="/login">Cadastre-se / Login</Link>
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
            <div className="user-area">
                <div className="user">
                    <span><FaUserCircle size="60"/> </span>
                    Cadastre-se ou faça seu login
                </div>
                <Link to="" className="carrinho">
                    <span> <GiShoppingCart size="60" /></span>
                    Carrinho
                </Link>
            </div>
        </div>
        <div className="bottom-menu">
            <p>Menu para escolher a pesquisa por conteúdo específico</p>
        </div>
    </header>
    );
}

export default Header;