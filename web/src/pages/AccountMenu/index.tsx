import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Footer from '../../partials/Footer/Footer';
import Header from '../../partials/Header/Header';
import { useAuth } from '../../contexts/auth'
import api from '../../services/api';
import { Link, useHistory } from "react-router-dom";
import load from '../../assets/load2.gif';

import './styles.css';  //Importa o css

const Cart = () => 
{

    const [track, setTrack] = useState<boolean>(true);
    const [history, setHistory] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);


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
        return(
            <div className="empty">
                <div className="title">O seu carrinho está vazio!</div>
                <Link to='/'>Continuar comprando</Link>
            </div>
        );
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
        </div>
    );
};

export default Cart;