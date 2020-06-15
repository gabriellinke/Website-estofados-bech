import React, { useEffect, useState} from 'react';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import Product from '../../partials/Product/Product';

import './styles.css';

import api from '../../services/api';
const Home = () => 
{
    interface ProductProps{
        description: string;
        id: number;
        images: string;
        name: string;
        price: string;
    }

    const [products, setProducts] = useState<ProductProps[]>([]); //Guardar a lista de produtos

    useEffect(() => {
        api.get('products')
            .then(response => {
                setProducts(response.data)
            });
    }, []);

    return(
        <div id="page-home">
            <Header />
            <div className="content">
                <main>
                    <h1>Seja bem vindo! Esta é a home page.</h1>    
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
                                    price={`R$${prod.price}`}
                                    conditions={`3x R$${prod.price}/3 sem juros`}
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