import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react'; 
import { MdAddShoppingCart } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Ajax from '../../services/ajax'
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import load from '../../assets/load2.gif';
import { useAuth } from '../../contexts/auth'
import { useHistory, Link } from "react-router-dom";

import './styles.css';  //Importa o css

const Product = () =>
{
    const { user } = useAuth();
    const history = useHistory();

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

    interface descriptionProps{
        id: number;
        description:string;
        product_id: number;
    }

    const [product, setProduct] = useState<ProductProps>({} as ProductProps); //Guardar a lista de produtos
    const [imagesUrl, setImagesUrl] = useState<string[]>([]); //Vetor que guarda as imagens secundárias
    const [mainImage, setMainImage] = useState<string>(""); //Vetor que guarda a imagem principal

    const [cepDestino, setCepDestino] = useState<string>(""); //Vetor que armazena o CEP de destino do produto
    const [freteInfo, setFreteInfo] = useState<string>(""); //Guarda as informações do frete para o CEP que foi consultado
    const [valorFrete, setValorFrete] = useState<string>("");   //Armazena o valor do frete
    const [prazoFrete, setPrazoFrete] = useState<string>("");   //Armazena o prazo de entrega dos correios
    const [mostrarFrete, setMostrarFrete] = useState<string>("");   //Diz se é preciso mostrar o frete
    const [loadingFrete, setLoadingFrete] = useState<boolean>(false);   //  Loading do frete

    const [descriptions, setDescriptions] = useState<descriptionProps[]>([]); //Armazena as descrições do produto
    const [options, setOptions] = useState<number[]>([]); // Armazena a quantidade de options disponíveis
    const [quantity, setQuantity] = useState<number>(1); // Armazena a quantidade de produtos que vão ser adicionados ao carrinho
    const [loadingCart, setLoadingCart] = useState<boolean>(false);   // Loading do adicionar ao carrinho

    // Vê qual é o produto da URL e seta as imagens de acordo com o produto
    let { id } = useParams();
    useEffect(() => {
        api.get('products/'+id) //id
            .then(response => {
                setProduct(response.data);
                if(response.data.images.indexOf(",") > 0)
                {
                    setImagesUrl(response.data.images.split(","));  //Separa a string num vetor de imagens
                    setMainImage(response.data.images.substring(0, response.data.images.indexOf(","))); //Seta a main image como a primeira imagem da string
                }
                else    //Se tiver apenas uma imagem
                {
                    setImagesUrl(response.data.images.split(","));  //Transforma em vetor de imagens. Como n vai ter vírgula, é um vetor de 1 posição
                    setMainImage(response.data.images); //Seta a main image
                }
            });
    }, [id]);

    // Precisa configurar para cada tamanho de produto
    const frete:FreteInfo = {
        cdServico: "04510", //SEDEX 04014 -   PAC 04510
        CepOrigem: 89870000,
        CepDestino: cepDestino,
        peso: (product?.peso !== undefined) ? product.peso : 5,
        formato: (product?.formato !== undefined) ? product.formato : 1,
        comprimento: (product?.comprimento !== undefined) ? product.comprimento : 16,
        altura: (product?.altura !== undefined) ? product.altura : 2,
        largura: (product?.largura !== undefined) ? product.largura : 11,
        diametro: (product?.diametro !== undefined) ? product.diametro : 5,
        cdMaoPropria: "N",
        valorDeclarado: 0,
        avisoRecebimento: "S",
    }

    // Carrega as descrições do produto
    useEffect(() => {
        api.get('descriptions/'+id)
            .then(response => {
                setDescriptions(response.data);
            })
    }, [id])

    // Quando as informações do frete são atualizadas, armazena os novos valores de preço e prazo do frete e mostra eles
    useEffect(() => {
        setValorFrete(freteInfo.substring(freteInfo.indexOf('<Valor>')+7, freteInfo.indexOf('</Valor>')));
        setPrazoFrete(freteInfo.substring(freteInfo.indexOf('<PrazoEntrega>')+14, freteInfo.indexOf('</PrazoEntrega>')));

        if(parseInt(prazoFrete) > 0)
            setMostrarFrete("show")
        else if(parseInt(prazoFrete) === 0)
            setMostrarFrete("error")
    }, [calcularFrete])

    // Disponibiliza a quantidade de unidades que podem ser compradas do produto
    useEffect(() => {
        var vetor = [];
        for(var i = 1; i <= Number(product?.quantity); i++)
        {
            vetor[i] = i;
        }
        setOptions(vetor);
    }, [product])

    // Muda a main image quando a secondary-image for clicada
    function handleImageClick(image:string)
    {
        setMainImage(image);
    }

    // Muda o CEP de destino quando é escrito algo no input
    function handleCEPInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        const { value } = event.target;

        setCepDestino(apenasNumeros(value));
    }

    // Retira os caracteres que não forem números do CEP
    function apenasNumeros(string:string) 
    {
        return string.replace(/[^0-9]/g,'');
    }

    // Calcula o frete com os dados informados e mostra o frete
    function calcularFrete(event: FormEvent<HTMLFormElement>)
    {
        setLoadingFrete(true)
        event.preventDefault();
        let ajax = new Ajax();
        ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+frete.cdServico +'&sCepOrigem='+ frete.CepOrigem+'&sCepDestino='+frete.CepDestino+'&nVlPeso='+frete.peso+'&nCdFormato='+frete.formato+'&nVlComprimento='+frete.comprimento+'&nVlAltura='+frete.altura+'&nVlLargura='+frete.largura+'&nVlDiametro='+frete.diametro+'&sCdMaoPropria='+frete.cdMaoPropria+'&nVlValorDeclarado='+frete.valorDeclarado+'&sCdAvisoRecebimento='+frete.avisoRecebimento+'%20HTTP/1.1',
        (status:number, response:string) => {
            setFreteInfo(JSON.stringify(response));
            setLoadingFrete(false);
        })
    }

    // Mostra animação de carregamento
    function loadingAnimationFrete()
    {
        if(loadingFrete)
        return(
            <img src={load} alt="Carregando" width="52.4" height="52.4"/>
        );
    }

    // Mostra o frete ou a mensagem de erro ao carregar o frete
    function showFrete()
    {
            if(mostrarFrete === "show")
            {
                return(
                    <div className="delivery">
                        <div className="delivery-text">Entrega</div>
                        <div className="delivery-data">
                            <div className="type">Normal</div>
                            <div className="day">{`Entregue em ${prazoFrete} dias`}</div>
                            <div className="cost">{`R$${valorFrete}`}</div>
                        </div>
                    </div>
                );
            }
            else if(mostrarFrete === "")
            {
                return(
                    <div></div>
                );
            }
            else
            {
                return(
                    <div className="error-delivery">CEP não encontrado, tente outro!</div>
                );
            }

    }

    // Altera a quantity quando há alguma mudança no select
    function handleQuantitySelectChange(event: ChangeEvent<HTMLSelectElement>) 
    {
        const { value } = event.target;
        setQuantity(parseInt(value));
    }

    // Faz a requisição para a API para adicionar o produto ao carrinho do usuário
    function addToCart()
    {
        setLoadingCart(true)
        if(localStorage.getItem('@EB:accessToken'))
        {
            api.post('/user/cart/add', {product_id: product?.id, user_id: user?.id, quantity: quantity})
                .then(response => {
                    setLoadingCart(false);
                    console.log(response.data);
                    history.push('/user/cart');
                })
                .catch(err =>{
                    console.log(err);
                    setLoadingCart(false);
                })
        }
        else
        {
            history.push('/user/login');
        }
    }

    // Mostra o botão do carrinho e mostra a animação de carregamento
    function buttonCart()
    {
        if(!loadingCart)
            return(
                <div className="add">
                    <MdAddShoppingCart size="50"/>
                    <div className="add-text">Adicionar ao carrinho</div>
                </div>
            );
        else
            return(
                <div className="add">
                    <img src={load} alt="Carregando" width="50" height="50"/>
                    <div className="add-text">Adicionar ao carrinho</div>
                </div>
            );
    }

    // Redireciona o usuário para a página de compra
    function handleCheckout(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        let idProduto = product.id        
        localStorage.setItem('@EB:id', String(idProduto));
        localStorage.setItem('@EB:quantity', String(quantity));
        if(localStorage.getItem('@EB:accessToken'))
        {
            try{
                history.push('/buying')
            }
            catch
            {
                history.push('/')
                console.log("Ocorreu um erro no submit do Checkout")
            }
        }
        else
        {
            history.push('/user/login')
        }
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
                            <form action="/buying" method="GET" id="form1" onSubmit={handleCheckout}>
                                <p className="price-area">{`R$${Number(product?.price).toFixed(2)}`}</p>
                                <p className="conditions">{`em até ${product?.conditions}x no cartão`}</p>
                                <div className="purchase-area">
                                    <p className="avaiable">{`${product?.quantity} unidades disponíveis`}</p>
                                    <div className="purchase">
                                        <select name="quantity" id="quantity" required placeholder="Quantidade" onChange={handleQuantitySelectChange}>
                                            {options.map(number => {
                                                return <option value={number} key={number}>{number}</option>;
                                            })
                                            }
                                        </select>
                                    <button type="submit">Comprar</button>
                                    <button type="button" onClick={addToCart}>
                                        {buttonCart()}
                                    </button>
                                    </div>
                                </div>
                            </form>
                            <div className="freight-area">
                                <div className="freight-text">Calcular frete e <br /> prazo de entrega</div>
                                <div className="cep">
                                    <form onSubmit={calcularFrete} id="form2">
                                        <input type="text" placeholder="CEP" name="cep" id="cep" onChange={handleCEPInputChange}/>
                                        <button>OK</button>
                                        {loadingAnimationFrete()}
                                    </form>
                                    <a target='blank' href="http://www.buscacep.correios.com.br/sistemas/buscacep/">Não sei meu CEP</a>
                                </div>
                            </div>
                            {showFrete()}
                            <div className="no-delivery">Se preferir, <Link to='/contato' className="contact">entre em contato</Link> e reserve o produto para retirada na loja. </div>
                        </div>
                    </div>
                </main>
                <div className="description">
                    <h1>Descrição</h1>
                    <h2>{product?.name}</h2>
                    {descriptions.map(res => {
                        return(
                        <p>{res.description}</p>
                        );
                    })}
                  </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product