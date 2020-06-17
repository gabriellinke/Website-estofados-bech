import React from 'react'
import { useAuth } from '../../contexts/auth'
import { Link } from "react-router-dom";

import './styles.css';  //Importa o css

const Checkout = () => 
{

    const { signOut } = useAuth();
    function handleLogOut(){
        signOut();
    }

    return(
        <div id="page-checkout">
            <h1>Comprando...</h1>
            <Link to= '/' onClick={handleLogOut}>Logout</Link>
        </div>
    );
};

export default Checkout;