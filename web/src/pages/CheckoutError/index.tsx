import React from 'react'
import Footer from '../../partials/Footer/Footer';
import SimpleHeader from '../../partials/SimpleHeader/SimpleHeader';
import {RiEmotionSadLine} from 'react-icons/ri'
import { Link } from "react-router-dom";

import './styles.css';  //Importa o css

const CheckoutError = () => 
{
    return(
        <div id="page-checkout-error">
            <SimpleHeader />
            <div className="content">
                <main>
                    <div className="title-second">
                        <div className="text">Infelizmente a sua compra não foi concluída!</div>
                        <span><RiEmotionSadLine size="60"/></span>
                    </div>
                    <div className='contato'>Caso haja alguma dúvida ou algum problema, <Link to='/contato'>contate</Link> a loja.</div>
                    
                    <Link to='/'>Voltar para a loja</Link>
                </main>
            </div>
            <Footer />
    </div>
    );
};

export default CheckoutError;