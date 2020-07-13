import React from 'react'
import Footer from '../../partials/Footer/Footer';
import logo from '../../assets/Logo.png';
import {RiEmotionSadLine} from 'react-icons/ri'
import header from '../../assets/header.png';
import menu from '../../assets/menu-acompanhamento.png';
import { Link } from "react-router-dom";

import './styles.css';  //Importa o css

const CheckoutError = () => 
{

    return(
        <div id="page-checkout-error">
            <body>
            </body>
            <header>
                <img src={logo} alt="Logomarca" />
            </header>
            <div className="content">
                <main>
                    <div className="title-second">Infelizmente a sua compra não foi concluída! <RiEmotionSadLine size="60"/></div>
                    <div className='contato'>Caso haja alguma dúvida ou algum problema, <Link to='/contato'>contate</Link> a loja.</div>
                    
                    <Link to='/'>Voltar para a loja</Link>
                </main>
            </div>
            <Footer />
    </div>
    );
};

export default CheckoutError;