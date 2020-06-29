import React from 'react'
import Footer from '../../partials/Footer/Footer';
import Header from '../../partials/Header/Header';

import './styles.css';  //Importa o css

// Página sendo utilizada como teste, pois é uma página só para admin
const Cart = () => 
{
    return(
        <div id="page-cart">
            <Header />
            <div className="content">
                <p>Carrinho</p>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;