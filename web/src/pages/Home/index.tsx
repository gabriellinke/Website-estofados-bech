import React, { useEffect, useState, ChangeEvent} from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import Product from '../../partials/Product/Product';
import api from '../../services/api';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import './styles.css';

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
    const [limit, setLimit] = useState<number>(24); // Quantidade de itens
    const [order, setOrder] = useState<string>(""); // Qual a ordem que os itens são organizados
    const [currentPage, setCurrentPage] = useState<number>(1); //Página atual
    const [nextPage, setNextPage] = useState<boolean>(false); // Mostra se tem próxima página
    const [previousPage, setPreviousPage] = useState<boolean>(false); // Mostra se tem uma página anterior

    // Consulta a API para pegar a lista de produtos
    useEffect(() => {
        api.get('products?page='+currentPage+'&limit='+limit+'&order='+order)
            .then(response => {
                setProducts(response.data.results)
                setResultsQuantity(response.data.quantity)
                setNextPage(!!response.data.next.page)
                setPreviousPage(!!response.data.previous.page)
            });
    }, [order]);

    // Calcula o tamanho da imagem do produto de acordo com o tamanho da div products-grid
    useEffect(() => {
        let largura = document.getElementById('products-grid')?.clientWidth;
        if(largura != undefined)
            largura = (largura - 72)/4;
        else
            largura = 264;
            
        setImageWidth(largura)
    }, [])

    // Muda o tipo de ordenação
    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) 
    {
        const { value } = event.target;        
        setOrder(value);
    }

    return(
        <div id="page-home">
            <Header />
            <div className="content">
                <main>
                    <h1>Seja bem vindo! Esta é a home page.</h1>
                    <div className="products-order">
                        <div className="order">
                            <div className="text">Organizar anúncios</div> 
                            <select name="order" id="order" onChange={handleSelectChange}>
                                <option value="01">Menor preço</option>    
                                <option value="10">Maior preço</option>    
                                <option value="az">A-Z</option>    
                                <option value="za">Z-A</option>    
                            </select>    
                        </div>    
                        <h3>{resultsQuantity} produtos</h3>
                    </div>
                    <div className="products-grid" id="products-grid">
                        {/* Cria os produtos */}
                        {products.map(prod => {
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
                                    conditions={`${prod.conditions}x R$${(Number(prod.price)/Number(prod.conditions)).toFixed(2)} sem juros`}
                                    id={prod.id}
                                    key={prod.id}
                                />
                            );
                        })}                 
                    </div>
                    <div className="pages">
                        <div className="buttons">
                            <button className="previous">
                                <IoIosArrowBack />
                                <div className="previous-page">Anterior</div>
                            </button>
                            <button className="next">
                                <div className="next-page">Próxima</div>
                                <IoIosArrowForward />
                            </button>
                        </div>
                        <div className="pages-info">Vendo página {currentPage} de {Math.max(1, parseInt((resultsQuantity / limit).toString()))}</div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Home;