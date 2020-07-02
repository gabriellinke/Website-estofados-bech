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

    let { category } = useParams();
    // Toda a vez que é mudada a categoria, faz uma consulta à API para pegar a lista de produtos
    useEffect(() => {
        api.get('category/search?page=1&limit=50&order=az&search='+category)
            .then(response => {
                setProducts(response.data.results)
            });
    }, [category]);

    return(
        <div id="page-home">
            <Header />
            <div className="content">
                <main>
                    <h1>Você está vendo {category}</h1>   
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