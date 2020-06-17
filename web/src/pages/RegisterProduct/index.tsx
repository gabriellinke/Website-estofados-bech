import React from 'react'
import { useAuth } from '../../contexts/auth'
import { Link } from "react-router-dom";

import './styles.css';  //Importa o css

const RegisterProduct = () => 
{
    return(
        <div id="page-register">
            <h1>Página para registrar produto. Somente Adm!!</h1>
        </div>
    );
};

export default RegisterProduct;