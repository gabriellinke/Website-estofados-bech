import React from 'react'; 
import Footer from '../../partials/Footer/Footer'
import Header from '../../partials/Header/Header'

import './styles.css';  //Importa o css

const Contact: React.FC = () =>
{

    return(
        <div id="page-contact">
            <Header />
            <div className="content">
                <main>
                    <h1>Contato</h1>
                    <div className="contact">
                        <div className="name">Nome para contato</div>
                        <div className="details">Detalhes de contato</div>
                        <div className="phone">Telefone: (49) 3366-1587</div>
                        <div className="whatsapp">Whatsapp: (49) 98894-1921 / (49) 98818-6614</div>
                        <div className="contact-email">Email: lojaestofadosbech@hotmail.com</div>
                        <div className="address">Endereço: Avenida Belém, Nº 1563, Centro, Pinhalzinho-SC - CEP 89870000</div>
                    </div>
                    <div className="social-media">
                        <title>Redes sociais</title>
                        <div className="facebook">Facebook</div>
                        <div className="instagram">Instagram</div>
                    </div>
                    <div className="email">

                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;