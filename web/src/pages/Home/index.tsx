import React, { useEffect, useState, ChangeEvent} from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import Product from '../../partials/Product/Product';
import api from '../../services/api';
import { Link } from 'react-router-dom'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import { BsFillLockFill } from 'react-icons/bs'
import { FaCircle, FaRegCreditCard } from 'react-icons/fa'
import mp from '../../assets/mercado-pago.png'

import './styles.css';

interface ProductProps{
    id: number;
    images: string;
    name: string;
    price: number;
    conditions: number;
}

interface ReformProps{
    image: string;
    id: number;
}

const Home = () => 
{
    const [products, setProducts] = useState<ProductProps[]>([]); //Guardar a lista de produtos
    const [resultsQuantity, setResultsQuantity] = useState<number>(0); // Quantidade de itens
    const [imageWidth, setImageWidth] = useState<number>(0); // Largura da imagem do produto
    const [limit, setLimit] = useState<number>(50); // Quantidade de itens
    const [order, setOrder] = useState<string>("az"); // Qual a ordem que os itens são organizados
    const [reformImages, setReformImages] = useState<ReformProps[]>(); //Vetor com as imagens
    const [indice, setIndice] = useState<number>(0); // Indice da imagem mostrada
    const [imageClicked, setImageClicked] = useState<number>(-1); // Diz se já foi clicado para pausar a imagem ou trocar imagem
    const [currentPage, setCurrentPage] = useState<number>(1); //Página atual
    const [nextPage, setNextPage] = useState<boolean>(false); // Mostra se tem próxima página
    const [previousPage, setPreviousPage] = useState<boolean>(false); // Mostra se tem uma página anterior

    // Consulta a API para pegar a lista de produtos
    useEffect(() => {
        setCurrentPage(1);
        // Troquei ordem, tenho que ir pra página 1
        api.get('products?page='+1+'&limit='+limit+'&order='+order)
            .then(response => {
                setProducts(response.data.results)
                setResultsQuantity(response.data.quantity)
                setNextPage(!!response.data.next.page)
                setPreviousPage(!!response.data.previous.page)
            });
    }, [order, limit]);

    // Calcula o tamanho da imagem do produto de acordo com o tamanho da div products-grid. Também pega as imagens de reforma
    useEffect(() => {
        let largura = document.getElementById('products-grid')?.clientWidth;
        if(largura !== undefined)
        {
            if(largura <= 425)
                largura = (largura - 24)/2;
            else if(largura > 425)
                largura = (largura - 72)/4;
        }
        else
            largura = 264;
            
        setImageWidth(largura)

        // Pega as imagens de reforma
        api.get('reform/index')
            .then(response => {
                setReformImages(response.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    // Atualiza a próxima página de produtos
    function handleNext()
    {
        api.get('products?page='+(currentPage+1)+'&limit='+limit+'&order='+order)
        .then(response => {
            setProducts(response.data.results)
            setResultsQuantity(response.data.quantity)
            setNextPage(!!response.data.next.page)
            setPreviousPage(!!response.data.previous.page)
            setCurrentPage(currentPage + 1)

            window.scrollTo(0, 0);
        });
    }

    // Atualiza a página anterior de produtos
    function handlePrevious()
    {
        api.get('products?page='+(currentPage-1)+'&limit='+limit+'&order='+order)
        .then(response => {
            setProducts(response.data.results)
            setResultsQuantity(response.data.quantity)
            setNextPage(!!response.data.next.page)
            setPreviousPage(!!response.data.previous.page)
            setCurrentPage(currentPage - 1)

            window.scrollTo(0, 0);
        });
    }

    // Mostra o botão de próxima página habilitado/desabilitado
    function buttonNext()
    {
        if(nextPage)
        {
            return(
                <button className="next" onClick={handleNext}>
                    <div className="next-page">Próxima</div>
                    <IoIosArrowForward />
                </button>
            );
        }
        else
        {
            return(
                <button disabled className="next-disabled">
                    <div className="next-page">Próxima</div>
                    <IoIosArrowForward />
                </button>
            );
        }

    }

    // Mostra o botão de página anterior habilitado/desabilitado
    function buttonPrevious()
    {
        if(previousPage)
        {
            return(
                <button className="previous" onClick={handlePrevious}>
                        <IoIosArrowBack />
                        <div className="previous-page">Anterior</div>
                </button>
            );
        }
        else
        {
            return(
                <button disabled className="previous-disabled">
                        <IoIosArrowBack />
                        <div className="previous-page">Anterior</div>
                </button>
            );
        }
    }

    // Mostra os produtos
    function productsList()
    {
        if(resultsQuantity > 0)
            return (
                products.map(prod => {
                    let images ="";
                    if(prod.images.indexOf(',') > 0)
                        images = prod.images.substring(0, prod.images.indexOf(','));
                    else
                        images = prod.images.substring(0, prod.images.length);
                    return(
                        <Product 
                            src={images}
                            width={imageWidth}
                            height={(imageWidth/3)*4}
                            title={prod.name}
                            price={`R$${Number(prod.price).toFixed(2)}`}
                            conditions={`em até ${prod?.conditions}x no cartão`}
                            id={prod.id}
                            key={prod.id}
                        />
                    );
                })
            );
    }

    // Muda o tipo de ordenação
    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) 
    {
        const { value } = event.target;        
        setOrder(value);
    }

    // Passa uma imagem
    function handleReformNextClick()
    {
        if(reformImages)
        {
            setImageClicked((indice + 1) % reformImages.length);
            setIndice((indice + 1) % reformImages.length);
        }
    }

    // Volta uma imagem
    function handleReformPreviousClick()
    {
        if(reformImages)
        {
            setImageClicked((indice + 3) % reformImages.length);
            setIndice((indice + 3) % reformImages.length);
        }
    }

    // Passa de imagem
    function rodarImagens() {
        if(imageClicked < 0)
            if(reformImages)
                setIndice((indice + 1) % reformImages.length); 
    }

    // Vai ficar passando as imagens se nenhuma imagem for clicada
    if(imageClicked < 0)
        setTimeout(rodarImagens , 6 * 1000);

    return(
        <div id="page-home">
            <Header />
            <div className="reform">
                <Link to='/contato'><h1>Peça sua reforma agora!</h1></Link>
                <div className="reform-image">
                    {reformImages?.map((image, i)=> {
                        return (
                            <img src={image.image} className={imageClicked < 0 ? (reformImages[indice].image === image.image ? 'opaque' : '') : (reformImages[imageClicked].image === image.image ? 'opaque' : '')} width='100%' height='450px' alt="Imagens de reforma de estofados"/>
                        )
                    })}
                    <span className='left' onClick={handleReformPreviousClick}><IoIosArrowBack size={80}/></span>
                    <span className="right" onClick={handleReformNextClick}><IoIosArrowForward size={80}/></span>
                </div>
                <div className="round-items">
                    {reformImages?.map((image, i)=> {
                        return (
                            <li className={imageClicked < 0 ? (reformImages[Number(indice)].image === image.image ? 'selected': "") : (reformImages[Number(indice)].image === image.image ? 'selected' : '')} onClick={() => {setIndice(i); setImageClicked(i);}}><FaCircle size='20'/></li>
                        )
                    })}
                </div>
            </div>

            <div className="content">
                <main>
                    <div className="container">
                        <div className="mercado-pago">
                            <span><img src={mp} alt="Mercado pago"/></span>
                            Pagamento seguro com <br/>Mercado Pago
                        </div>
                        <div className="payment-methods">
                            <span><FaRegCreditCard size='50'/></span>
                            {/* Pagamentos no boleto, cartão <br/> e mais */}
                            Diversos meios de pagamento <br/> disponíveis
                        </div>
                        <div className="safe">
                            <span><BsFillLockFill size='45' /></span>
                            Site seguro
                        </div>
                    </div>

                    <h1>Produtos</h1>
                    <div className="products-order">
                        <div className="order">
                            <div className="text">Organizar anúncios</div> 
                            <select name="order" id="order" onChange={handleSelectChange}>
                                <option value="az">A-Z</option>    
                                <option value="za">Z-A</option>    
                                <option value="01">Menor preço</option>    
                                <option value="10">Maior preço</option>    
                            </select>    
                        </div>    
                        <h3>{resultsQuantity} produtos</h3>
                    </div>
                    <div className="products-grid" id="products-grid">
                        {productsList()}
                    </div>
                    <div className="pages">
                        <div className="buttons">
                            {buttonPrevious()}
                            {buttonNext()}
                        </div>
                        <div className="pages-info">Vendo página {currentPage} de {Math.max(1, Math.ceil(resultsQuantity / limit))}</div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Home;