import React, { useEffect, useState} from 'react'; 
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';

import './styles.css';  //Importa o css


const Product = () =>
{

    return(
        <div id="product-info">
            <Header />
            <div className="content">
                <h2>Descrição com o nome</h2>
                <main>
                    <div className="image">
                        <div className="main-image">
                            <img src="https://img.olx.com.br/images/76/761024038059097.jpg" alt=""/>
                        </div>
                        <div className="secondary-image">
                            
                            <img src="https://statig1.akamaized.net/bancodeimagens/54/ra/yr/54rayrwzhhotxjugpfy9g0x7n.jpg" alt=""/>
                            <img src="https://images.noticiasautomotivas.com.br/img/f/NovoKa-BancoCouro.jpg" alt=""/>
                            <img src="https://img.olx.com.br/images/76/761024038059097.jpg" alt=""/>
                        </div>
                    </div>
                    <div className="buy">
                        <h1>testando o display grid da div main</h1>
                    </div>
                </main>
                <div className="description">
                    <h1>Descrição</h1>
                    <h2>Nome do produto</h2>
                    <p>Parágrafo 1</p>
                    <p>Parágrafo 2</p>
                    <p>Parágrafo 3</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product