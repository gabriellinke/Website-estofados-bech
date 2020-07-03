import React, { useEffect, useState} from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import Product from '../../partials/Product/Product';
import api from '../../services/api';

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
    const [search, setSearch] = useState<string>(""); // Frase que foi pesquisada
    const [resultsQuantity, setResultsQuantity] = useState<number>(0); // Quantidade de itens

    // Consulta a API para pegar a lista de produtos
    useEffect(() => {
        let res = window.location.href.split('?'); //Pega o parametro da URL
        let search = res[1].split('='); //Pega os valores do parâmetro
        let searchString = search[1]; //Pega os valores do parâmetro
        let searchArray = searchString.split('+'); //Substitui os + por espaços
        let searchFinal = searchArray.join(' '); //Substitui os + por espaços
        setSearch(searchFinal);
        
        api.get('search?page=1&limit=24&order=az&search='+searchFinal)
            .then(response => {
                setProducts(response.data.results)
                setResultsQuantity(response.data.quantity)
            });
    }, []);

    return(
        <div id="page-search">
            <Header />
            <div className="content">
                <main>
                    <h1>Resultado da pesquisa por: {search}</h1>
                    <h3>{resultsQuantity} resultados</h3>
                    <div className="order">
                        Organizar anúncios
                        <select name="order" id="order">
                            <option value="01">Menor preço</option>    
                            <option value="10">Maior preço</option>    
                            <option value="az">A-Z</option>    
                            <option value="za">Z-A</option>    
                        </select>    
                    </div>     
                    <div className="products-grid">
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
                                    width={256}
                                    height={320}
                                    title={prod.name}
                                    price={`R$${Number(prod.price).toFixed(2)}`}
                                    conditions={`${prod.conditions}x R$${(Number(prod.price)/Number(prod.conditions)).toFixed(2)} sem juros`}
                                    id={prod.id}
                                    key={prod.id}
                                />
                            );
                        })}                 
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Home;