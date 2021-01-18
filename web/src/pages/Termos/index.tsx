import React from 'react';
import Footer from '../../partials/Footer/Footer';
import SimpleHeader from '../../partials/SimpleHeader/SimpleHeader';

import './styles.css';  //Importa o css

const Termos = () => 
{
    return(
        <div id="page-termos">
            <SimpleHeader/>
            <div className="content">
                <main>
                    <h1>Termos e condições gerais de uso</h1>
                    <div className="info">

                    </div>
                </main>
            </div>    
            <Footer />
        </div>
    );
};

export default Termos;