import React from 'react'
import Footer from '../../partials/Footer/Footer';

import './styles.css';  //Importa o css

// Página sendo utilizada como teste, pois é uma página só para admin
const RegisterProduct = () => 
{
    return(
        <div id="page-register-product">
            <div className="content">
                <p>Página somente para Admin!</p>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterProduct;