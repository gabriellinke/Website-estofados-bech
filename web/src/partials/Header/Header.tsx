import React, { useState, useEffect, ChangeEvent, FormEvent}from 'react';
import { Link, useHistory } from "react-router-dom";
import api from '../../services/api';
import { FiSearch } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa'
import { AiFillFileAdd } from 'react-icons/ai'
import { MdMenu, MdKeyboardArrowDown } from 'react-icons/md'
import logo from '../../assets/Logo.png';
import { useAuth } from '../../contexts/auth'

import './Header.css';
// É o Header que é utilizado na maioria das páginas

interface HeaderProps{
    title?: string,
}

interface CategoriesProps{
    category: string;
}

interface User
{
    email: string;
    name: string;
}

const Header: React.FC<HeaderProps> = (props) =>
{
    const history = useHistory();
    const { user, signOut } = useAuth();

    // Estados para saber se deve mostrar o menu de categorias
    const [show, setShow] = useState<boolean>(false);
    const [overMenu, setOverMenu] = useState<boolean>(false);
    const [overOptions, setOverOptions] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoriesProps[]>();
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        api.get('category')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

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
        {
            if(!user.admin)
            {
                return (
                    <div className="user-area">
                        <div className="user">
                            <Link to='/user/menu'>
                                <span><FaUserCircle size="60"/> </span>
                            </Link>
                            <div className="name-logout">
                                <div className="user-name">{user.name}</div>
                                <Link to="" className="logout" onClick={handleLogOut}>Logout</Link>
                            </div>
                        </div>
                        <Link to="/user/cart" className="carrinho">
                            <span> <GiShoppingCart size="60" /></span>
                            Carrinho
                        </Link>
                    </div>
                );
            }
            else
            {
                return (
                    <div className="user-area">
                        <Link to='/register' className='register'>
                            <span><AiFillFileAdd size='60' /> </span>
                            <div>Novo <br/>produto</div>
                        </Link>
                        <div className="user">
                            <Link to='/user/menu'>
                                <span><FaUserCircle size="60"/> </span>
                            </Link>
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
        }
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

    // Categorias que vão aparecer no menu
    function categoriesOptions()
    {
        if(show && categories != undefined)
            return(
                <div className="categories-options" onMouseEnter={handleOverOptions} onMouseLeave={() => setOverOptions(false)}>
                    {
                        categories.map(res => {
                            if(res.category === 'sem categoria') return;
                            return(
                            <Link to={'/category/' + res.category} className="options">
                                <div className="first-option">{res.category.replace(/\w/, (c:string) => c.toUpperCase())}</div>
                            </Link>
                            );
                        })
                    }
                </div>
            )
    }

    // Categorias de mais fácil acesso, ao lado do menu
    function categoriesOutOfMenu()
    {
        if(categories != undefined)
        {
            return(
                <div className="direction-row">
                    <Link to={`/category/${categories[1].category}`}>
                        <div className="first-categorie">
                            {categories[1].category.replace(/\w/, (c:string) => c.toUpperCase())}
                        </div>
                    </Link>
                    <Link to={`/category/${categories[2].category}`}>
                        <div className="second-categorie">
                            {categories[2].category.replace(/\w/, (c:string) => c.toUpperCase())}
                        </div>
                    </Link>
                    <Link to={`/category/${categories[3].category}`}>
                        <div className="third-categorie">
                            {categories[3].category.replace(/\w/, (c:string) => c.toUpperCase())}
                        </div>
                    </Link>
                </div>
            );
        }
    }

    // Atualiza o valor do input
    function handleSearchInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        const { value } = event.target;

        setSearch(value);
    }

    // Redireciona o usuário para a página de pesquisa
    function handleSubmit(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        try{
            history.push('/search/'+search)
        }
        catch
        {
            history.push('/search/')
        }
    }

    return(
    <header id="Header">
        <div className = "top">
            <Link to="/">Home</Link>
            <Link to="">Quem somos</Link>
            <Link to="/contato">Contato</Link>
        </div>
        <div className="middle">
            <div className="logo-search">
                <Link to='/'>
                    <img src={logo} alt="Logomarca" />
                </Link>
                <form id="form2" onSubmit={handleSubmit}>
                    <div className="search-field">
                        <input type="text" name="search" placeholder="Buscar" onChange={handleSearchInputChange}/>
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
                <div className="categories-out-of-menu">
                    {categoriesOutOfMenu()}
                </div>
            </div>
        </div>
    </header>
    );
}

export default Header;