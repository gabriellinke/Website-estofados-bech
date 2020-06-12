import React, { useEffect, useState} from 'react'; 
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import { MdAddShoppingCart } from 'react-icons/md';

import './styles.css';  //Importa o css


const Product = () =>
{

    return(
        <div id="product-info">
            <Header />
            <div className="content">
                <main>
                    <h2>Descrição com o nome</h2>
                    <div className="grid">
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
                            <form action="" id="form1">
                                <p className="price-area"> R$500,00 </p>
                                <p className="conditions">em até 5x de R$100,00 sem juros</p>
                                <div className="purchase-area">
                                    <p className="avaiable">1 unidade disponível</p>
                                    <div className="purchase">
                                        <select name="qtd" id="" required>
                                            <option value="">
                                                Quantidade
                                            </option>
                                        </select>
                                        <button>Comprar</button>
                                        <div className="add">
                                            <MdAddShoppingCart size="50"/>
                                            <div className="add-text">Adicionar ao carrinho</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="freight-area">
                                    <div className="freight-text">Calcular frete e <br /> prazo de entrega</div>
                                    <div className="cep">
                                        <form action="" id="form2">
                                            <input type="text" placeholder="CEP"/>
                                            <button>OK</button>
                                        </form>
                                        <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/">Não sei meu CEP</a>
                                    </div>
                                </div>
                            </form>
                            <div className="delivery">
                                <div className="delivery-text">Entrega</div>
                                <div className="delivery-data">
                                    <div className="type">Normal</div>
                                    <div className="day">15 de Maio</div>
                                    <div className="cost">R$72.50</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <div className="description">
                    <h1>Descrição</h1>
                    <h2>Nome do produto</h2>
                    <p>Trabalhamos com diversos modelos de carpetes automotivos. Dos mais diversos materiais, cores e estilos. Dos mais clássicos, nas cores cinza ou preta, até cores mais distintas, como o grafite, que ajudam a compor a decoração interna do carro.</p>
                    <p>O Grupo JB mantém em estoque regular grande variedade de carpetes moldados (inteiriços) e carpetes modelados (recortados) para diversos modelos de automóveis nacionais.</p>
                    <p>São carpetes encorpados, de modelagem e encaixes perfeitos, com alto grau de aderência e acabamento. O verso do carpete moldado e/ou modelado é especialmente desenvolvido para a melhor absorção da cola sintética (verifique qual o tipo de cola indicada), evitando problemas futuros, como soltura ou escorregamento do carpete sobre o assoalho.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product