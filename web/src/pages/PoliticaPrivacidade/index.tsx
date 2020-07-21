import React from 'react';
import Footer from '../../partials/Footer/Footer';
import SimpleHeader from '../../partials/SimpleHeader/SimpleHeader';

import './styles.css';  //Importa o css

const CheckoutConfirm = () => 
{

    return(
        <div id="page-politica">
            <SimpleHeader/>
            <div className="content">
                <main>
                    <h1>Política de privacidade</h1>
                    <div className="info">

                    </div>
                </main>
            </div>    
            <Footer />
        </div>
    );
};

export default CheckoutConfirm;