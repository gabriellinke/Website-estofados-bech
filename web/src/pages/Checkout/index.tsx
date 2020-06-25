import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikField from "../../components/FormikField";


import './styles.css';  //Importa o css

interface Data {
    product_id: number;
    productName: string;
    quantity: number;
    price: number;

    name: string;
    surname: string;
    email: string;
    area_code: string;
    phone: string;
    cpf: string;

    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    adjunct: string;

    url: string;
    checkout_id: string;
};

interface FormValues {
    name: string;
    surname: string;
    email: string;
    phone: string;
    cpf: string;
    area_code: string;

    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    adjunct: string;
};

const initialValues: FormValues = {
    name: "",
    surname: "",
    email: "",
    area_code: "",
    phone: "",
    cpf: "",

    cep: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    adjunct: "", 
};

const CheckoutSchema = Yup.object().shape({
    name: Yup.string()
        .required("Obrigatório"),
    surname: Yup.string()
        .required("Obrigatório"),
    email: Yup.string()
        .lowercase()
        .email("Email inválido!")
        .required("Obrigatório"),
    area_code: Yup.string()
        .required("Obrigatório"),
    phone: Yup.string()
        .required("Obrigatório"),
    cpf: Yup.string()
        .required("Obrigatório"),
    
    cep: Yup.string()
        .required("Obrigatório"),
    state: Yup.string()
        .required("Obrigatório"),
    city: Yup.string()
        .required("Obrigatório"),        
    neighborhood: Yup.string()
        .required("Obrigatório"),
    street: Yup.string()
        .required("Obrigatório"),
    number: Yup.string()
        .required("Obrigatório"),
    adjunct: Yup.string(),

});


const Checkout = () => 
{
    const [preference_id, setPreference_id] = useState<string>("vazio");
    const [link, setLink] = useState<string>("#");
    const [id, setId] = useState<string>("0");
    const [price, setPrice] = useState<number>(999999);
    const [productName, setProductName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [checkoutData, setCheckoutData] = useState<Data>();
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        api.post('checkout/data', checkoutData)
            .then(response => {
                console.log(response);
                setDisabled(false);
            })
    }, [checkoutData])

    useEffect(() => {
        let res = window.location.href.split('?');
        if(res[1])
        {
            let parametros = res[1].split('&');

            if(parametros[0] !== null)
                setId(parametros[0].split("=")[1])

            if(parametros[1])
                setPrice(parseInt(parametros[1].split("=")[1]))
            
            if(parametros[2])
            {                
                let nome = parametros[2].split("=")[1];
                let aux = nome.split("+");
                setProductName(aux.join(" "))
            }

            if(parametros[3])
                setQuantity(parseInt(parametros[3].split("=")[1]))
    
        }

    }, [])

    const handleSubmit = (values: FormValues): void =>
    {
        const {
            name,
            surname,
            email,
            area_code,
            phone,
            cpf,

            cep,
            state,
            city,
            neighborhood,
            street,
            number,
            adjunct, 
        } = values;

        api.post('checkout', {
            id, price, productName, quantity,
            name, surname, email, phone: parseInt(phone), cpf, area_code,
            cep, state, city, neighborhood, street, number, adjunct, 
        })
            .then(response => {
                console.log(response.data);
                setPreference_id(response.data.checkout_id);
                setLink(response.data.checkoutInfo.url);

                const {
                    product_id,
                    productName,
                    quantity,
                    price,
              
                    name,
                    surname,
                    email,
                    area_code,
                    phone,
                    cpf,
              
                    cep,
                    state,
                    city,
                    neighborhood,
                    street,
                    number,
                    adjunct,
              
                    url,
                    checkout_id,
                  } = response.data.checkoutInfo;

                  setCheckoutData({
                    product_id: parseInt(product_id),
                    productName,
                    quantity: parseInt(quantity),
                    price: parseInt(price),
              
                    name,
                    surname,
                    email,
                    area_code,
                    phone,
                    cpf,
              
                    cep,
                    state,
                    city,
                    neighborhood,
                    street,
                    number,
                    adjunct,
              
                    url,
                    checkout_id,
                  })
        })
    }

    function buttonDisabled()
    {
        if(disabled)
            return (<button disabled>Pagar com Mercado Pago</button>);
        else
            return (<button>Pagar com Mercado Pago</button>);
    }
    
    return(
        <div id="page-checkout">
            <h1>Comprando...</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={CheckoutSchema}
            >
                {() => {
                    return (
                        <div>
                            <Form className="form">
                                <FormikField name="name" label="Nome"/>
                                <FormikField name="surname" label="Sobrenome"/>
                                <FormikField name="cpf" label="CPF"/>
                                <FormikField name="email" label="Email"/>
                                <FormikField name="area_code" label="DDD"/>
                                <FormikField name="phone" label="Telefone"/>

                                <FormikField name="cep" label="CEP"/>
                                <FormikField name="state" label="Estado"/>
                                <FormikField name="city" label="Cidade"/>
                                <FormikField name="neighborhood" label="Bairro"/>
                                <FormikField name="street" label="Rua"/>
                                <FormikField name="number" label="Número"/>
                                <FormikField name="adjunct" label="Complemento"/>

                                <button type="submit">Confirmar dados</button>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
            
            <a href={`${link}`}>
                {buttonDisabled()}
            </a>
        </div>
    );
};

export default Checkout;