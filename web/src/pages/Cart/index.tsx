import React, { useState, useEffect, ChangeEvent } from 'react'
import Footer from '../../partials/Footer/Footer';
import Header from '../../partials/Header/Header';
import { useAuth } from '../../contexts/auth'
import api from '../../services/api';
import { Link } from "react-router-dom";
import load from '../../assets/load2.gif';

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
    const [loadingInput, setLoadingInput] = useState<number>(0); //Animação de loading quando adiciona/remove produto. O number é o id do produto
    const [productsPrice, setProductsPrice] = useState<number>(0); //Salva a o preço acumulado dos produtos

    // Ao abrir a página faz um request pra API pra pegar os produtos que estão no carrinho do usuário
    useEffect(() => {
        let id = 0;
        if(user?.id)
            id = user.id;

        api.get('user/cart/'+id) 
            .then(response => {
                setProductsQuantity(response.data.quantity);
                setProducts(response.data.products);
            });
    }, [])

    // Atualiza o preço total quando os produtos do carrinho são atualizados
    useEffect(() => {
        updateProductsPrice();
    }, [productsQuantity, products])
    
    // Remove um produto do carrinho
    function removeProduct(product_id:number)
    {
        setLoadingInput(product_id);
        api.post('user/cart/remove', {user_id: user?.id, product_id, quantity: -1})
            .then(res => {
                setProducts(products.filter(prod => {
                    return prod.id !== product_id;
                }))
                setProductsQuantity(productsQuantity.filter(prod => {
                    return prod.product_id !== product_id;
                }))
                setLoadingInput(0);
            })
            .catch(err =>{
                console.log(err);
                setLoadingInput(0);
            })
    }

    // Quando é mudado o número do input, é feito um POST para a API pra atualizar o número de produtos do carrinho
    function handleQuantityInputChange(event: ChangeEvent<HTMLInputElement>, product_id:number) 
    {
        const { value } = event.target;        
        setLoadingInput(product_id);
        // Muda a quantidade do produto e seta a quantidade com o novo valor
        api.post('user/cart/change', {user_id: user?.id, product_id, quantity: value})
        .then(res => {
            const filtered = productsQuantity.filter(prod => {
                return prod.product_id !== product_id;
            })
            const product = productsQuantity.filter(prod => {
                return prod.product_id === product_id;
            })
            product[0].quantity = res.data.quantity;

            setProductsQuantity([product[0], ...filtered]);
            setLoadingInput(0);
        })
        .catch(err =>{
            console.log(err);
            setLoadingInput(0);
        })
    }
    
    // Atualiza o preço total dos produtos do carrinho
    function updateProductsPrice()
    {
        const prices = products.map(prod => {
            const quantity = productsQuantity.filter(res => {
                return res.product_id === prod.id;
            })
            return quantity[0].quantity * parseFloat(prod.price); // Preço total
        })
        
        let totalPrice = 0;
        for(let price of prices)
        {
            totalPrice += price;
        }

        setProductsPrice(totalPrice);
    }
    
    // Retorna o input ou o input com a animação de carregamento
    function Input(prod:ProductProps, currentQuantity: number)
    {
        if(loadingInput !== prod.id)
            return(
                <div className="input">
                    <input type="number" className="current-quantity" min={1} max={prod.quantity} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityInputChange(event ,prod.id)} defaultValue={currentQuantity.toString()}/>
                </div>
            );
        else
            return(
                <div className="input">
                    <input disabled type="number" className="current-quantity" min={1} max={prod.quantity} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityInputChange(event ,prod.id)} defaultValue={currentQuantity.toString()}/>
                    <img src={load} alt="Carregando" width="40" height="40"/>
                </div>
            );
    }

    return(
        <div id="page-cart">
            <Header />
            <div className="content">
                <main>
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

                            return(
                                <li key={prod.id} className="cart-product">
                                    <Link to={`/products/${prod.id}`}>
                                        <div className="info">
                                            <img src={images} width={100} height={100} alt={prod.name}/>
                                            <div className="title">{prod.name}</div>
                                        </div>
                                    </Link>
                                    <div className="quantity-price">
                                        <div className="quantity">
                                            {Input(prod, currentQuantity[0].quantity)}
                                        </div>    
                                        <div className="max-quantity-remove-price">
                                            <div className="max-quantity-remove">
                                                <div className="max-quantity">{prod.quantity} disponíveis</div>
                                                <button className="remove" onClick={() => removeProduct(prod.id)}>Excluir</button>
                                            </div>
                                            <div className="price">
                                                <strong>{`R$${(Number(prod.price)*Number(currentQuantity[0].quantity)).toFixed(2)}`}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </div>
                    <div className="total-price">{productsPrice}</div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;