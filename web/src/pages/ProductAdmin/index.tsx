import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react'; 
import { MdAddShoppingCart } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Ajax from '../../services/ajax'
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import load from '../../assets/load2.gif';
import { useAuth } from '../../contexts/auth'
import { useHistory } from "react-router-dom";

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

    interface descriptionProps{
        id: number;
        description:string;
        product_id: number;
    }

    const [product, setProduct] = useState<ProductProps>(); //Guardar a lista de produtos
    const [imagesUrl, setImagesUrl] = useState<string[]>([]); //Vetor que guarda as imagens secundárias
    const [mainImage, setMainImage] = useState<string>(""); //Vetor que guarda a imagem principal

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
    }, []);

    // Carrega as descrições do produto
    useEffect(() => {
        api.get('descriptions/'+id)
            .then(response => {
                setDescriptions(response.data);
            })
    }, [])

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

    // Altera a quantity quando há alguma mudança no select
    function handleQuantitySelectChange(event: ChangeEvent<HTMLSelectElement>) 
    {
        const { value } = event.target;
        setQuantity(parseInt(value));
        console.log(value)
    }

    // Faz a requisição para a API para adicionar o produto ao carrinho do usuário
    function addToCart(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        setLoadingCart(true)
        api.post('/user/cart/add', {product_id: product?.id, user_id: user?.id, quantity: quantity})
            .then(response => {
                setLoadingCart(false);
                console.log(response.data);
                history.push('/user/cart')
            })
            .catch(err =>{
                console.log(err);
                setLoadingCart(false);
            })
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

    function deleteImage(image:string)
    {
        console.log(image)
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
                                        <div>
                                            <span onClick={(() => deleteImage(image))}>X</span>
                                            <img src={image}
                                            className={ (mainImage === image) ? 'selected' : ''}
                                            alt="Imagem do produto"
                                            key={image}
                                            id={image}
                                            onClick={() => handleImageClick(image)}/>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="buy">
                            <form action="/buying" method="GET" id="form1">
                                <input type="hidden" name="id" value={product?.id} />
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
                                        
                                            <form onSubmit={addToCart} id="form3">
                                                <button>
                                                    {buttonCart()}
                                                </button>
                                            </form>
                                    </div>
                                </div>
                                <div className="freight-area">
                                    {/* Área que vai ter o botão */}
                                </div>
                            </form>
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