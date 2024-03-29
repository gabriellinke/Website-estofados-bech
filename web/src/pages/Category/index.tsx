import React, { useEffect, useState, ChangeEvent} from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import Product from '../../partials/Product/Product';
import api from '../../services/api';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import './styles.css';
import { useParams } from 'react-router-dom';

const Home = () => 
{
    interface ProductProps{
        id: number;
        images: string;
        name: string;
        price: number;
        conditions: number;
    }

    const [products, setProducts] = useState<ProductProps[]>([]); //Guardar a lista de produtos
    const [resultsQuantity, setResultsQuantity] = useState<number>(0); // Quantidade de itens
    const [imageWidth, setImageWidth] = useState<number>(0); // Largura da imagem do produto
    const [limit, setLimit] = useState<number>(8); // Quantidade de itens
    const [order, setOrder] = useState<string>("az"); // Qual a ordem que os itens são organizados
    const [currentPage, setCurrentPage] = useState<number>(1); //Página atual
    const [nextPage, setNextPage] = useState<boolean>(false); // Mostra se tem próxima página
    const [previousPage, setPreviousPage] = useState<boolean>(false); // Mostra se tem uma página anterior

    // Consulta a API para pegar a lista de produtos
    let { category } = useParams();
    useEffect(() => {
        setCurrentPage(1);
        // Troquei categoria / ordem, tenho que ir pra página 1
        api.get('category/search?page='+1+'&limit='+limit+'&order='+order+'&search='+category)
            .then(response => {
                setProducts(response.data.results)
                setResultsQuantity(response.data.quantity)
                setNextPage(!!response.data.next.page)
                setPreviousPage(!!response.data.previous.page)
            });
    }, [order, category, limit]);

    // Calcula o tamanho da imagem do produto de acordo com o tamanho da div products-grid. Também pega as imagens de reforma
    useEffect(() => {
        let largura = document.getElementById('products-grid')?.clientWidth;
        if(largura !== undefined)
        {
            if(largura <= 500)
                largura = (largura - 24)/2;
            else if(largura > 500 && largura <= 650)
                largura = (largura - 48)/3;
            else if(largura > 650)
                largura = (largura - 72)/4;
        }
        else
            largura = 264;
            
        setImageWidth(largura)

    }, [])

    // Atualiza a próxima página de produtos
    function handleNext()
    {
        api.get('category/search?page='+(currentPage+1)+'&limit='+limit+'&order='+order+'&search='+category)
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
        api.get('category/search?page='+(currentPage-1)+'&limit='+limit+'&order='+order+'&search='+category)
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
                            height={imageWidth}
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

    return(
        <div id="page-category">
            <Header />
            <div className="content">
                <main>
                    <h1>{category.replace(/\w/, (c:string) => c.toUpperCase())}</h1>
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