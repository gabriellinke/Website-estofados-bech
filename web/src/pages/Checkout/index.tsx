import React from 'react'
import { useAuth } from '../../contexts/auth'
import { Link } from "react-router-dom";

import './styles.css';  //Importa o css

const Checkout = () => 
{
    return(
        <div id="page-checkout">
            <h1>Comprando...</h1>
        </div>
    );
};

export default Checkout;