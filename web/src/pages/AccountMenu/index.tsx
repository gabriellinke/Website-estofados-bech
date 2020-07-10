import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Footer from '../../partials/Footer/Footer';
import Header from '../../partials/Header/Header';
import { useAuth } from '../../contexts/auth'
import api from '../../services/api';
import { Link, useHistory } from "react-router-dom";
import load from '../../assets/load2.gif';

import './styles.css';  //Importa o css

interface SoldProduct
{
    code: string;
    date: string;
    delivered: boolean;
    email: string;
    id: number;
    image: string;
    name: string;
    price: string;
    quantity: string;
}

const Cart = () => 
{
    const { user } = useAuth();

    const [track, setTrack] = useState<boolean>(true);
    const [history, setHistory] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);
    const [delivered, setDelivered] = useState<SoldProduct | undefined>();
    const [products, setProducts] = useState<SoldProduct[]>([]);
    const [noneHistory, setNoneHistory] = useState<boolean>(true);  
    const [noneTrack, setNoneTrack] = useState<boolean>(true);

    useEffect(() => {
        api.get('email/sold/'+user?.email)
            .then(response => {
                setProducts(response.data)
                setNoneHistory(!response.data.find((res:any) => res.delivered === true))
                setNoneTrack(!response.data.find((res:any) => !res.delivered === true))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function modalDelivered()
    {
        if(delivered != undefined)
        {
            return(
                <div id="modal" className='delete-modal'>
                    <div className="content">
                        <div className="header">
                            <h1>Você já recebeu o seu produto?</h1>
                            <div className="buttons">
                                <button className="ok" onClick={wasDelivered}>Sim</button>
                                <button onClick={() => setDelivered(undefined)}>Não</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    function wasDelivered()
    {
        setDelivered(undefined)
        api.post('products/delivered', {id: delivered?.id})
            .then(res => {
                if(res.data.modificado)
                {
                    const updatedProducts = products.map(prod => {
                        if(prod.id != delivered?.id)
                            return prod;
                        else
                        {
                            prod.delivered = true;
                            return prod;
                        }
                    })
                    setProducts(updatedProducts)
                    setNoneHistory(!updatedProducts.find((res:any) => res.delivered === true))
                    setNoneTrack(!updatedProducts.find((res:any) => !res.delivered === true))
                }
                setDelivered(undefined)
            })
            .catch(err => {
                console.log(err);
                setDelivered(undefined)
            })
    }

    function title()
    {
        if(track)
            return <h1>Acompanhar compra</h1>
        else if(history)
            return <h1>Histórico de compras</h1>
        else
            return <h1>Alterar informações da conta</h1>
    }

    function content()
    {
        if(track)
        {
            if(noneTrack)
            return(
                <div className="not-found">
                    Não há nenhum produto para ser acompanhado
                </div>
            );
            else
            {
                return(
                    <div className="products-list">
                        {products?.map(product => {
                            return (!product.delivered) ?
                            
                            <div className="sold-product">
                                <div className="image-title-price">
                                    <div className="image">
                                        <img src={product.image} width={100} height={100} alt={product.name}/>
                                    </div>
                                    <div className="title-price">
                                        <div className="title">{product.name} x{product.quantity}</div>
                                        <div className="price">R${parseInt(product.price).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="code">
                                    <p>Código de rastreamento:</p>
                                    <p>{product.code}</p>
                                    <button onClick={() => setDelivered(product)}>Recebi meu produto</button>
                                </div>
                            </div>
    
                            : <div></div>
                        })}
                    </div>
                );
            }
        }
        else if(history)
        {
            if(noneHistory)
                return(
                    <div className="not-found">
                        Nenhum produto encontrado no <br/> Histórico de compras
                    </div>
                );
            else
            {
                return(
                    <div className="products-list">
                        {products?.map(product => {
                            return (product.delivered) ?
        
                            <div className="sold-product">
                                <div className="image-title-price">
                                    <div className="image">
                                        <img src={product.image} width={100} height={100} alt={product.name}/>
                                    </div>
                                    <div className="title-price">
                                        <div className="title">{product.name} x{product.quantity}</div>
                                        <div className="price">R${parseInt(product.price).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="date">
                                    <p>Data da compra:</p>
                                    <p>{product.date}</p>
                                </div>
                            </div>
        
                            : <div></div>
                        })}
                    </div>
                );
            }
        }
    }

    function handleTrackClick()
    {
        setTrack(true);
        setHistory(false);
        setChange(false);
    }

    function handleHistoryClick()
    {
        setTrack(false);
        setHistory(true);
        setChange(false);
    }

    function handleChangeClick()
    {
        setTrack(false);
        setHistory(false);
        setChange(true);
    }

    return(
        <div id="page-user-menu">
            <Header />
            <div className="content">
                <main>
                    <div className="menu">
                        <div className={`option ${track? 'selected' : ''}`} onClick={handleTrackClick}>Acompanhar compra</div>
                        <div className={`option ${history? 'selected' : ''}`} onClick={handleHistoryClick}>Histórico de compras</div>
                        <div className={`option ${change? 'selected' : ''}`} onClick={handleChangeClick}>Alterar informações da conta</div>
                    </div>
                    <div className="info">
                        {title()}
                        {content()}
                    </div>
                </main>
            </div>
            <Footer />
            {modalDelivered()}
        </div>
    );
};

export default Cart;