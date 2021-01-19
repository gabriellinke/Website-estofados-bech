import React, { useState, ChangeEvent } from 'react'; 
import Footer from '../../partials/Footer/Footer'
import Header from '../../partials/Header/Header'
import { FiInstagram } from 'react-icons/fi';
import { AiFillFacebook } from 'react-icons/ai';
import { IoLogoWhatsapp } from 'react-icons/io';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/FormikField";
import api from '../../services/api';
import check from '../../assets/check.svg';
import errIcon from '../../assets/xred.svg';
import load from '../../assets/load2.gif';

import './styles.css';  //Importa o css

interface FormValues {
    email: string;
    name: string;
    phone: string;
}
  
const initialValues: FormValues = {
    email: "",
    name: "",
    phone: "",
};

const SubmitSchema = Yup.object().shape({
    name: Yup.string()
        .required("Obrigatório"),
    email: Yup.string()
        .required("Obrigatório")
        .email("Precisa ser um email"),
    phone: Yup.string()
        .notRequired(),
});

const Contact: React.FC = () =>
{

    const [situation, setSituation] = useState<string>("hide"); // Mostra o modal da situação da mensagem
    const [loading, setLoading] = useState<boolean>(false); // Mostra animação de loading
    const [message, setMessage] = useState<string>(''); // Mensagem

    // Mensagem de enviado ou de erro
    function sendModal()
    {
        if(situation === 'show')
            return(
                <div id="modal" className={situation}>
                    <div className="content">
                        <div className="header">
                            <img src={check} width='50px' alt="Mensagem enviada"></img>
                            <h1>Mensagem enviada</h1>
                        </div>
                    </div>
                </div>
            );
        else if(situation === 'error')
            return(
                <div id="modal" className={situation}>
                    <div className="content">
                        <div className="header">
                            <img src={errIcon} width='50px' alt="Erro"></img>
                            <h1>Erro ao enviar mensagem</h1>
                        </div>
                    </div>
                </div>
            );
    }

    // Envia um email
    const handleSubmit = (values: FormValues): void => 
    {
        const {
            name,
            email,
            phone,
        } = values

        setLoading(true);
        api.post('send', {name, email, phone, message})
            .then(response => {
                if(response.data.send)
                {
                    setSituation("show");
                    setTimeout(() => {
                        setSituation("hide");
                    }, 2000)
                }
                else
                {
                    setSituation("error");
                    setTimeout(() => {
                        setSituation("hide");
                    }, 2000)
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setSituation("error");
                setTimeout(() => {
                    setSituation("hide");
                }, 2000)
                setLoading(false);
            })

    }

    function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>)
    {
        const { value } = event.target;        
        setMessage(value);
    }

    return(
        <div id="page-contact">
            <Header />
            <div className="content">
                <main>
                    <h1>Contato</h1>
                    <div className="contact-content">
                        <div className="contact">
                            <div className="details">Detalhes de contato</div>
                            <div className="info">
                                <div className="title">Telefone:</div>
                                <div className="phone">(49) 3366-1587</div>
                            </div>
                            <div className="info">
                                <div className="title">Whatsapp:</div>
                                <div className="whatsapp">(49) 98894-1921 <br/> (49) 98818-6614</div>
                            </div>
                            <div className="info">
                                <div className="title">Email:</div>
                                <div className="contact-email">lojaestofadosbech@hotmail.com</div>
                            </div>
                            <div className="info">
                                <div className="title">Endereço:</div>
                                <div className="address">Avenida Belém, Nº 1563, Centro, Pinhalzinho-SC <br/>CEP 89870000</div>
                            </div>
                        </div>
                        <div className="social-media">
                            <div className="title">Redes sociais</div>
                            <a target='blank' href="https://www.facebook.com/estofadosbech" className="facebook">
                                <span> < AiFillFacebook size="60"/> </span>
                                Facebook
                            </a>
                            <a target='blank' href="https://www.instagram.com/estofadosbech/" className="instagram">
                                <span><FiInstagram size="60"/></span>
                                Instagram
                            </a>
                            <a target='blank' href="https://wa.me/5549988186614" className="whatsapp">
                                <span><IoLogoWhatsapp size="60"/></span>
                                WhatsApp
                            </a>
                        </div>
                        <div className="email">
                            <div className="title">Envie uma mensagem</div>
                            <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={SubmitSchema}
                            >
                            {() => {
                                return (
                                    <Form className="form">
                                        <FormikField name="name" label="Nome"/>
                                        <FormikField name="email" label="Email"/>
                                        <FormikField name="phone" label="Telefone (opcional)"/>
                                        <textarea
                                            style={{
                                                width: '100%',
                                                marginTop: '30px',
                                                padding: '8px',
                                                height: '10vh',
                                                resize: 'none',
                                            }}
                                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTextAreaChange(event)}
                                            placeholder="Escreva sua mensagem" 
                                            name="message"
                                            required={true}
                                        />

                                        <div className="send-button">
                                            <button className="form-button" type="submit">Enviar</button>
                                            {loading && <img src={load} alt="Carregando" width="56" height="56"/>}
                                        </div>
                                    </Form>
                                );
                            }}
                            </Formik>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
            {sendModal()}
        </div>
    );
};

export default Contact;