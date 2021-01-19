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
                    <div className="info" 
                        style={{
                            paddingLeft: '5vw',
                            paddingRight: '5vw',
                            paddingBottom: '10vh',
                        }}
                    >
                        Esta área é destinada para a apresentação dos termos e condições gerais de uso. 
                        Como o website atual é utilizado apenas para fins de estudo, esta seção permanecerá vazia.
                    </div>
                </main>
            </div>    
            <Footer />
        </div>
    );
};

export default Termos;