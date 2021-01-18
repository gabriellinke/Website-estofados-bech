import React, { useState, useEffect } from 'react'
import api from '../../services/api'

import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';

import './styles.css';  //Importa o css

interface Data {
    product_id: number;
    productName: string;
    quantity: number;
    price: number;
    freightPrice: number;

    name: string;
    surname: string;
    email: string;
    area_code: string;
    phone: string;
    cpf: string;

    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    adjunct: string;

    url: string;
    checkout_id: string;

    userId: number;
    userName: string;
    userSurname: string;
    userEmail: string;
};

// Propriedades que tem no produto
interface ProductProps{
    id: number;
    images: string;
    name: string;
    price: string;
    quantity: number;
    conditions: number;
    peso: number;
    formato: number;
    comprimento: number;
    altura: number;
    largura: number;
    diametro: number;
}

const CheckoutConfirm = () => 
{
    const [prices, setPrices] = useState<number[]>([]); // Guarda o preço de cada produto
    const [productNames, setProductNames] = useState<string[]>([]); // Guarda o nome de cada produto
    const [images, setImages] = useState<string[]>([]);  // Guarda a imagem de cada produto
    const [quantitys, setQuantitys] = useState<number[]>([]);   // Guarda a quantidade de cada produto
    const [totalQuantity, setTotalQuantity] = useState<number[]>([]); // Guarda a quantidade de produtos na lista de checkout
    const [totalPrice, setTotalPrice] = useState<number>(0);    // Guarda o preço total, somando todos os produtos
    const [frete, setFrete] = useState<number>(0);  // Salva o custo do frete

    const [link, setLink] = useState<string>("#"); // Onde fica salvo o link para o redirecionamento para a compra
    const [checkoutData, setCheckoutData] = useState<Data>(); // Dados que vão ser usados para criar um aviso de nova compra no banco de dados e email

    // Carrega os produtos e as informações de checkout
    useEffect(() => {
        setCheckoutData(JSON.parse(String(localStorage.getItem('@EB:checkoutData'))));
        setFrete(JSON.parse(String(localStorage.getItem('@EB:checkoutData'))).freightPrice);
        setLink(JSON.parse(String(localStorage.getItem('@EB:checkoutData'))).url)

        let idURL = localStorage.getItem('@EB:id');
        let qtdsURL = localStorage.getItem('@EB:quantity');
        let storagedId = '';
        let storagedQuantity = '';

        if(idURL && qtdsURL)
        {
            storagedId = idURL;
            storagedQuantity = qtdsURL;
        }

        // Consulta a api com os ids dos produtos que vieram como parâmetro
        api.post('/products/list', {products: `${storagedId}`})
            .then(response => {
                const productsAux = response.data.products   // Guarda os produtos em uma variável

                let quantidadeFinal = [0]; // Guarda a quantidade de unidades de cada produto

                let qtds = storagedQuantity.split("-");   // Separa a quantidade de cada produto em um vetor
                let param = qtds.map(qtd => {
                    return parseInt(qtd);
                })

                let l = 0;
                let quantidadeDeProdutos = [0];    // Salva a quantidade total de produtos
                for(let iterator of param)  // Salva a quantidade do produto como a que veio da URL ou a máx disponível
                {
                    if(productsAux[l])
                    {
                        quantidadeFinal[l] = (parseInt(productsAux[l].quantity) > iterator) ? iterator : parseInt(productsAux[l].quantity);
                    }
                    quantidadeDeProdutos[l] = l;
                    l++;
                }

                setTotalQuantity(quantidadeDeProdutos);
                setQuantitys(quantidadeFinal);

                let i = 0;
                let precoFinal = [0];   // Salva o preço de cada produto
                let parcelaFinal = [""];   // Salva as parcelas
                let nomeFinal = [""];   // Salva o nome de cada produto
                for(let prod of productsAux)
                {
                    parcelaFinal[i] = prod.conditions;
                    precoFinal[i] = prod.price;
                    nomeFinal[i] = prod.name;
                    i++;
                }
                
                setPrices(precoFinal)
                setProductNames(nomeFinal)

                let k = 0;
                let precoXquantidade = [0];     // Auxiliar pra achar a soma dos preços dos produtos
                for(let preco of precoFinal)
                {
                    precoXquantidade[k] = preco * quantidadeFinal[k];
                    k++;
                }

                const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue;
                setTotalPrice(precoXquantidade.reduce(reducer))  // Salva como o preço total a soma de todos os preços

                let j = 0;
                let imagemFinal = [""];     // Salva a imagem do produto
                for(let prod of productsAux)
                {
                    if(prod.images.indexOf(",") > 0)
                        imagemFinal[j] = prod.images.substring(0, prod.images.indexOf(",")); 
                    else
                        imagemFinal[j] = prod.images;

                    j++;
                }
                setImages(imagemFinal);
            })
    }, [])

    return(
        <div id="page-checkout-confirm">
            <Header />
            <div className="content">
                <main>
                    <h1>Confirmação dos dados</h1>
                    <div className="grid">
                        <div className="user-info">
                            <h3>Dados de contato</h3>
                            <div className="email">Email: {checkoutData?.email}</div>
                            <div className="phone">Telefone: ({checkoutData?.area_code}) {checkoutData?.phone}</div>
                            <h3>Dados do comprador</h3>
                            <div className="name">Nome: {checkoutData?.name} {checkoutData?.surname}</div>
                            <div className="cpf">CPF: {checkoutData?.cpf}</div>
                            <h3>Endereço de entrega</h3>
                            <div className="cep">CEP: {checkoutData?.cep}</div>
                            <div className="state">Estado: {checkoutData?.state}</div>
                            <div className="city">Cidade: {checkoutData?.city}</div>
                            <div className="neighborhood">Bairro: {checkoutData?.neighborhood}</div>
                            <div className="street">Rua/Avenida: {checkoutData?.street}</div>
                            <div className="number">Número: {checkoutData?.number}</div>
                            <div className="adjunct">Complemento: {checkoutData?.adjunct}</div>
                        </div>
                        <div className="product-info-button">
                            <div className="product-info">
                                {totalQuantity.map(num => {
                                    return(
                                    <div className="general-info">
                                        <img src={images[num]} alt="Imagem do produto"/>
                                        <div className="name-price">
                                            <div className="name">{productNames[num]} x{quantitys[num]}</div>
                                            <div className="price">R${((Number)(prices[num])*(Number)(quantitys[num])).toFixed(2)}</div>
                                        </div>
                                    </div>
                                    );
                                })}
                                <div className="costs">
                                    <div className="subtotal">
                                        <div className="name">Subtotal</div>
                                        <div className="price">R${(totalPrice).toFixed(2)}</div>
                                    </div>
                                    <div className="freight">
                                        <div className="name">Custo do frete</div>
                                        <div className="price">R${frete.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="total-costs">
                                    <div className="name">Total</div>
                                    <div className="price">R${((totalPrice)+(frete)).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="mercado-pago-button">
                                <div className="payment-button">
                                    <p>Verifique os dados antes de realizar o pagamento</p>
                                    <div className="confirm">
                                        <a target='blank' href={`${link}`}>
                                            <button className="normal">Pagar com Mercado Pago</button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>    
            <Footer />
        </div>
    );
};

export default CheckoutConfirm;