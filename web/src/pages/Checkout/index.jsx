import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { Link } from "react-router-dom";

import './styles.css';  //Importa o css

const Checkout = () => 
{
    const [preference_id, setPreference_id] = useState("vazio");
    const [link, setLink] = useState("vazio");

    useEffect(() => {
        api.post('checkout')
        .then(response => {
            console.log(response.data)
            setPreference_id(response.data.id)
            setLink(response.data.url)
        })
    }, [])

    function button()
    {
        return(
            <form action="/processar_pagamento" method="POST">
                <script
                    src="https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js"
                    data-preference-id={`${preference_id}`}
                    data-button-label="Pagar com Mercado Pago">
                </script>
            </form>
        )
    }
    
    return(
        <div id="page-checkout">
            <h1>Comprando...</h1>
            <div>
                {/* <form action="/processar_pagamento" method="POST">
                    <script
                        src="https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js"
                        data-preference-id={`${preference_id}`}
                        data-button-label="Pagar com Mercado Pago">
                    </script>
                </form> */}
                {button()}
                <a href={`${link}`}>Comprar</a>
            </div>


        </div>
    );
};

export default Checkout;