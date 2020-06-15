import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react'; 
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

import './styles.css';  //Importa o css
import axios from 'axios';  //Usado para rotas
import Ajax from '../../services/ajax'
import { stringify } from 'querystring';




// interface CEPProps{
//     cep: string,
//     logradouro: string,
//     complemento: string,
//     bairro: string,
//     localidade: string,
//     uf: string,
//     unidade: string,
//     ibge: number,
//     gia: number,
//     }

// // Tem uma função para consultar o CEP
// var cep = '80420120';
// useEffect(() => {
//     axios.get<CEPProps>(`https://viacep.com.br/ws/${cep}/json/`)
//         .then(response => {
//             const infoCEP:CEPProps = response.data;
//             // console.log(infoCEP);
//         })
// }, []);



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

    // Informações para o cálculo do frete
    interface FreteInfo{
        cdServico: string,
        CepOrigem: number,
        CepDestino: string,
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

    const [product, setProduct] = useState<ProductProps>(); //Guardar a lista de produtos
    const [imagesUrl, setImagesUrl] = useState<string[]>([]); //Vetor que guarda as imagens secundárias
    const [mainImage, setMainImage] = useState<string>(""); //Vetor que guarda a imagem principal
    const [cepDestino, setCepDestino] = useState<string>(""); //Vetor que armazena o CEP de destino do produto
    const [freteInfo, setFreteInfo] = useState<string>(""); //Guarda as informações do frete para o CEP que foi consultado
    const [valorFrete, setValorFrete] = useState<string>("");   //Armazena o valor do frete
    const [prazoFrete, setPrazoFrete] = useState<string>("");   //Armazena o prazo de entrega dos correios

    // Precisa configurar para cada tamanho de produto
    const frete:FreteInfo = {
        cdServico: "04510", //SEDEX 04014 -   PAC 04510
        CepOrigem: 89870000,
        CepDestino: cepDestino,
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

    // Vê qual é o produto da URL e seta as imagens de acordo com o produto
    let { id } = useParams();
    useEffect(() => {
        api.get('products/'+id) //id
            .then(response => {
                setProduct(response.data);
                setImagesUrl(response.data.images.split(","));  //Separa a string num vetor de imagens
                setMainImage(response.data.images.substring(0, response.data.images.indexOf(","))); //Seta a main image como a primeira imagem da string
            });
    }, []);

    // Quando as informações do frete são atualizadas, armazena os novos valores de preço e prazo do frete
    useEffect(() => {
        setValorFrete(freteInfo.substring(freteInfo.indexOf('<Valor>')+7, freteInfo.indexOf('</Valor>')));
        setPrazoFrete(freteInfo.substring(freteInfo.indexOf('<PrazoEntrega>')+14, freteInfo.indexOf('</PrazoEntrega>')));
    }, [freteInfo])

    // Muda a main image quando a secondary-image for clicada
    function handleImageClick(image:string)
    {
        setMainImage(image);
    }

    // Muda o CEP de destino quando é escrito algo no input
    function handleCEPInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        const { name, value } = event.target;

        setCepDestino(apenasNumeros(value));
    }

    // Retira os caracteres que não forem números do CEP
    function apenasNumeros(string:string) 
    {
        return string.replace(/[^0-9]/g,'');
    }

    // Calcula o frete com os dados informados
    function calcularFrete(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        let ajax = new Ajax();
        ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+frete.cdServico +'&sCepOrigem='+ frete.CepOrigem+'&sCepDestino='+frete.CepDestino+'&nVlPeso='+frete.peso+'&nCdFormato='+frete.formato+'&nVlComprimento='+frete.comprimento+'&nVlAltura='+frete.altura+'&nVlLargura='+frete.largura+'&nVlDiametro='+frete.diametro+'&sCdMaoPropria='+frete.cdMaoPropria+'&nVlValorDeclarado='+frete.valorDeclarado+'&sCdAvisoRecebimento='+frete.avisoRecebimento+'%20HTTP/1.1',
        (status:number, response:string) => {
            setFreteInfo(JSON.stringify(response));
        })
    }


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
                                        <form onSubmit={calcularFrete} id="form2">
                                            <input type="text" placeholder="CEP" name="cep" id="cep" onChange={handleCEPInputChange}/>
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