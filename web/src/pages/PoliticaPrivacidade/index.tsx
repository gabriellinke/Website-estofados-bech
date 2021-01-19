import React from 'react';
import Footer from '../../partials/Footer/Footer';
import SimpleHeader from '../../partials/SimpleHeader/SimpleHeader';

import './styles.css';  //Importa o css

const PoliticaPrivacidade = () => 
{

    return(
        <div id="page-politica">
            <SimpleHeader/>
            <div className="content">
                <main>
                    <h1>Política de privacidade</h1>
                    <div className="info" 
                        style={{
                            paddingLeft: '5vw',
                            paddingRight: '5vw',
                            paddingBottom: '10vh',
                        }}
                    >
                        Esta área é destinada para a apresentação da política de privacidade. Como o website atual é utilizado apenas
                        para fins de estudo, esta seção permanecerá vazia.
                    </div>
                </main>
            </div>    
            <Footer />
        </div>
    );
};

export default PoliticaPrivacidade;