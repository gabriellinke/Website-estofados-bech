import React from 'react'
import Footer from '../../partials/Footer/Footer';
import SimpleHeader from '../../partials/SimpleHeader/SimpleHeader';
import header from '../../assets/header.png';
import menu from '../../assets/menu-acompanhamento.png';
import { Link } from "react-router-dom";

import './styles.css';  //Importa o css

const CheckoutPending = () => 
{

    return(
        <div id="page-checkout-pending">
            <SimpleHeader/>
            <div className="content">
                <main>
                    <div className="title-first">Parabéns,</div>
                    <div className="title-second">Você acabou de fazer uma compra na Loja Estofados Bech!</div>
                    <div className='info'>Assim que o pagamento for aprovado um email será enviado para você. Dessa forma, você poderá acompanhar a sua compra com o código 
                        dos correios que será informado nesse email. Além disso, também será possível acessar a sua conta e acompanhar o pedido pelo site, como demonstrado abaixo:</div>
                    <div className="header-image">
                        <img src={header} width='100%' alt="Cabeçalho" />
                        <div className="subtitle">No cabeçalho, clique na imagem de usuário.</div>
                    </div>
                    <div className="menu-image">
                        <img src={menu} width='100%' alt="Cabeçalho" />
                        <div className="subtitle">No menu que se abre, selecione a opção de acompanhar compra.</div>
                    </div>
                    <div className='contato'>Caso haja alguma dúvida ou algum problema, <Link to='/contato'>contate</Link> a loja.</div>

                    <Link to='/'>Voltar para a loja</Link>
                </main>
            </div>
            <Footer />
    </div>
    );
};

export default CheckoutPending;