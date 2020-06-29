import React, { useState, useEffect } from 'react'
import Footer from '../../partials/Footer/Footer';
import Header from '../../partials/Header/Header';
import { useAuth } from '../../contexts/auth'
import api from '../../services/api';
import CartProduct from '../../partials/CartProduct/CartProduct';

import './styles.css';  //Importa o css

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

interface QuantityProps{
    product_id: number;
    quantity: number;
}

const Cart = () => 
{
    const { user } = useAuth(); // Usuário da sessão
    const [products, setProducts] = useState<ProductProps[]>([]); //Guardar a lista de produtos
    const [productsQuantity, setProductsQuantity] = useState<QuantityProps[]>([]); //Guardar a lista com a quantidade de cada produto

    useEffect(() => {
        let id = 0;
        if(user?.id)
            id = user.id;

        api.get('user/cart/'+id) 
            .then(response => {
                setProductsQuantity(response.data.quantity);
                setProducts(response.data.products);
                console.log(response.data.products);
                console.log(response.data.quantity);
            });
    }, [])

    return(
        <div id="page-cart">
            <Header />
            <div className="content">
                {/* <p>Carrinho</p>  */}
                <div className="products-grid">
                    {products.map(prod => {
                        let images ="";
                        if(prod.images.indexOf(',') > 0)
                            images = prod.images.substring(0, prod.images.indexOf(','));
                        else
                            images = prod.images.substring(0, prod.images.length);

                        const currentQuantity = productsQuantity.filter(res => {
                            return res.product_id === prod.id;
                        })

                        console.log(currentQuantity, prod.id);
                        return(
                            <CartProduct 
                                src={images}
                                width={100}
                                height={100}
                                currentQuantity={currentQuantity[0].quantity}
                                maxQuantity={prod.quantity}
                                title={prod.name}
                                price={`R$${Number(prod.price).toFixed(2)}`}
                                id={prod.id}
                                key={prod.id}
                            />
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;