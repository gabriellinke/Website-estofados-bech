import React from 'react';
import './Footer.css';
import { Link } from "react-router-dom";
import { FiInstagram } from 'react-icons/fi';
import {AiFillFacebook} from 'react-icons/ai';

import logo from '../../assets/Logo.png';

// É o Footer que é utilizado na maioria das páginas

interface FooterProps{
    title?: string,
}

// Componente escrito em formato de função (React.FC)
const Footer: React.FC<FooterProps> = (props) =>
{
    return(
    <footer>
        <div className="info">
            <div className="contato">
                <Link to="">Contato</Link>
                <a href="https://www.facebook.com/estofadosbech" className="icone">
                    Facebook
                    <span> < AiFillFacebook size="35"/> </span>
                </a>
                <a href="https://www.instagram.com/estofadosbech/" className="icone">
                    Instagram
                    <span><FiInstagram size="35"/></span>
                </a>
            </div>
            
            <p>Copyright &copy; 2020 Gabriel Henrique Linke</p>
            <p>Avenida Belém, Nº 1563, Centro, Pinhalzinho-SC - CEP 89870000</p>
        </div>
        <Link to='/'>
            <img src={logo} alt="Logomarca" />
        </Link>
    </footer>
    );
}

export default Footer;