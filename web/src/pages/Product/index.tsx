import React, { useEffect, useState} from 'react'; 
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

import './styles.css';  //Importa o css


const Product = () =>
{
    interface ProductProps{
        description: string;
        id: number;
        images: string;
        name: string;
        price: string;
        quantity: number;
        conditions: number;
    }

    const [product, setProduct] = useState<ProductProps>(); //Guardar a lista de produtos

    let { id } = useParams();
    useEffect(() => {
        api.get('products/'+id) //id
            .then(response => {
                setProduct(response.data)
            });
    }, []);

    let images ="";
    if(product?.images!=undefined)
    {
        if(product?.images.indexOf(',') > 0)
            images = product?.images.substring(0, product?.images.indexOf(','));
        else
            images = product?.images.substring(0, product?.images.length);
    }

    // product?.price / product?.conditions   Preço da parcela

    return(
        <div id="product-info">
            <Header />
            <div className="content">
                <main>
                <h2>{product?.name}</h2>
                    <div className="grid">
                        <div className="image">
                            <div className="main-image">
                                <img src={`http://localhost:3333/uploads/${images}`} alt=""/>
                            </div>
                            <div className="secondary-image">
                                <img src={`http://localhost:3333/uploads/${product?.images.substring(product?.images.indexOf(',')+1, product?.images.length)}`} alt=""/>
                                <img src="https://statig1.akamaized.net/bancodeimagens/54/ra/yr/54rayrwzhhotxjugpfy9g0x7n.jpg" alt=""/>
                                <img src="https://images.noticiasautomotivas.com.br/img/f/NovoKa-BancoCouro.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="buy">
                            <form action="" id="form1">
                                <p className="price-area">{`R$${product?.price}`}</p>
                                <p className="conditions">{`em até ${product?.conditions}x de R$${100} sem juros`}</p>
                                <div className="purchase-area">
                                    <p className="avaiable">{`${product?.quantity} unidade disponível`}</p>
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
                    <h2>{product?.name}</h2>
                    <p>{product?.description}</p>
                    <p>O Grupo JB mantém em estoque regular grande variedade de carpetes moldados (inteiriços) e carpetes modelados (recortados) para diversos modelos de automóveis nacionais.</p>
                    <p>São carpetes encorpados, de modelagem e encaixes perfeitos, com alto grau de aderência e acabamento. O verso do carpete moldado e/ou modelado é especialmente desenvolvido para a melhor absorção da cola sintética (verifique qual o tipo de cola indicada), evitando problemas futuros, como soltura ou escorregamento do carpete sobre o assoalho.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product