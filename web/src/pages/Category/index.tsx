import React, { useEffect, useState} from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import Product from '../../partials/Product/Product';
import api from '../../services/api';

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

    let { category } = useParams();
    // Toda a vez que é mudada a categoria, faz uma consulta à API para pegar a lista de produtos
    useEffect(() => {
        api.get('category/search?page=1&limit=24&order=az&search='+category)
            .then(response => {
                setProducts(response.data.results)
                setResultsQuantity(response.data.quantity)
            });
    }, [category]);

    return(
        <div id="page-category">
            <Header />
            <div className="content">
                <main>
                    <h1>{category.replace(/\w/, (c:string) => c.toUpperCase())}</h1>
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