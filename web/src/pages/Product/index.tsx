import React, { useEffect, useState} from 'react'; 
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

import './styles.css';  //Importa o css
import axios from 'axios';  //Usado para rotas
import Ajax from '../../services/ajax'
import { stringify } from 'querystring';

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
    const [imagesUrl, setImagesUrl] = useState<string[]>([]); //Vetor que guarda as imagens secundárias
    const [mainImage, setMainImage] = useState<string>(""); //Vetor que guarda a imagem principal

    let { id } = useParams();
    useEffect(() => {
        api.get('products/'+id) //id
            .then(response => {
                setProduct(response.data);
                setImagesUrl(response.data.images.split(","));  //Separa a string num vetor de imagens
                setMainImage(response.data.images.substring(0, response.data.images.indexOf(","))); //Seta a main image como a primeira imagem da string
            });
    }, []);

    function handleImageClick(image:string)
    {
        setMainImage(image);
    }

    interface CEPProps{
        cep: string,
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string,
        unidade: string,
        ibge: number,
        gia: number,
        }


    // Tem uma função para consultar o CEP
    var cep = '80420120';
    useEffect(() => {
        axios.get<CEPProps>(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                const infoCEP:CEPProps = response.data;
                // console.log(infoCEP);
            })
    }, []);

    interface FreteInfo{
        cdServico: string,
        CepOrigem: number,
        CepDestino: number,
        peso: number,
        formato: number, 
        comprimento: number,
        altura: number,
        largura: number,
        diametro: number,
        cdMaoPropria: string,
        valorDeclarado: number,
        avisoRecebimento: string,
    }

    const frete:FreteInfo = {
        cdServico: "04510", //SEDEX 04014 -   PAC 04510
        CepOrigem: 89870000,
        CepDestino: 80420120,
        peso: 2,
        formato: 1, 
        comprimento: 30,
        altura: 30,
        largura: 30,
        diametro: 30,
        cdMaoPropria: "N",
        valorDeclarado: 0,
        avisoRecebimento: "N",
    }


    const [freteInfo, setFreteInfo] = useState<string>("");
    useEffect(() => {
        let ajax = new Ajax();
        ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+frete.cdServico +'&sCepOrigem='+ frete.CepOrigem+'&sCepDestino='+frete.CepDestino+'&nVlPeso='+frete.peso+'&nCdFormato='+frete.formato+'&nVlComprimento='+frete.comprimento+'&nVlAltura='+frete.altura+'&nVlLargura='+frete.largura+'&nVlDiametro='+frete.diametro+'&sCdMaoPropria='+frete.cdMaoPropria+'&nVlValorDeclarado='+frete.valorDeclarado+'&sCdAvisoRecebimento='+frete.avisoRecebimento+'%20HTTP/1.1',
        (status:number, response:string) => {
            setFreteInfo(JSON.stringify(response));
        })
    }, [])

    const [valorFrete, setValorFrete] = useState<string>("");
    const [prazoFrete, setPrazoFrete] = useState<string>("");
    useEffect(() => {
        setValorFrete(freteInfo.substring(freteInfo.indexOf('<Valor>')+7, freteInfo.indexOf('</Valor>')));
        setPrazoFrete(freteInfo.substring(freteInfo.indexOf('<PrazoEntrega>')+14, freteInfo.indexOf('</PrazoEntrega>')));
    }, [freteInfo])


    return(
        <div id="product-info">
            <Header />
            <div className="content">
                <main>
                <h2>{product?.name}</h2>
                    <div className="grid">
                        <div className="image">
                            <div className="main-image">
                                <img src={mainImage} alt="Imagem do produto"/>
                            </div>
                            <div className="secondary-image">
                                {imagesUrl.map(image => {
                                     return(
                                        <img src={image}
                                        className={ (mainImage === image) ? 'selected' : ''}
                                        alt="Imagem do produto"
                                        key={image}
                                        id={image}
                                        onClick={() => handleImageClick(image)}/>
                                    );
                                })}
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
                                    <div className="day">{`Entregue em ${prazoFrete} dias`}</div>
                                    <div className="cost">{`R$${valorFrete}`}</div>
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