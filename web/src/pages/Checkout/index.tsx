import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikField from "../../components/FormikField";
import Ajax from '../../services/ajax'

import './styles.css';  //Importa o css
import Product from '../../partials/Product/Product';

interface Data {
    product_id: number;
    productName: string;
    quantity: number;
    price: number;
    freightPrice: number;

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

interface ProductProps{
    id: number;
    images: string;
    name: string;
    price: string;
    quantity: number;
    conditions: number;
    peso: number;
    formato: number;
    comprimento: number;
    altura: number;
    largura: number;
    diametro: number;
}

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
        .required("Obrigatório")
        .matches(/^[0-9]+$/, "Digite apenas números")
        .min(2, "Tamanho inválido")
        .max(2, "Tamanho inválido"),
    phone: Yup.string()
        .required("Obrigatório")
        .min(8, "Tamanho inválido")
        .max(9, "Tamanho inválido")
        .matches(/^[0-9]+$/, "Digite apenas números"),
    cpf: Yup.string()
        .required("Obrigatório")
        .matches(/^[0-9]+$/, "Digite apenas números")
        .min(11, "Tamanho inválido")
        .max(11, "Tamanho inválido"),
    
    cep: Yup.string()
        .required("Obrigatório")
        .matches(/^[0-9]+$/, "Digite apenas números")
        .min(8, "Tamanho inválido")
        .max(8, "Tamanho inválido"),
    state: Yup.string()
        .required("Obrigatório"),
    city: Yup.string()
        .required("Obrigatório"),        
    neighborhood: Yup.string()
        .required("Obrigatório"),
    street: Yup.string()
        .required("Obrigatório"),
    number: Yup.string()
        .required("Obrigatório")
        .matches(/^[0-9]+$/, "Digite apenas números"),
    adjunct: Yup.string(),

});


const Checkout = () => 
{
    const [preference_id, setPreference_id] = useState<string>("vazio");

    const [product, setProduct] = useState<ProductProps>(); //Guardar a lista de produtos

    const [link, setLink] = useState<string>("#");
    const [id, setId] = useState<string>("0");
    const [price, setPrice] = useState<number>(999999);                 //PRECISO
    const [productName, setProductName] = useState<string>("");             //PRECISO
    const [quantity, setQuantity] = useState<number>(0);
    const [checkoutData, setCheckoutData] = useState<Data>();
    const [disabled, setDisabled] = useState<boolean>(true);

    const [frete, setFrete] = useState<string>("0");

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

            api.get('/products/'+parametros[0].split("=")[1])
                .then(response => {
                    setProduct(response.data);

                    if(parametros[1])
                    {
                        if((parseInt(parametros[1].split("=")[1])) <= response.data.quantity)
                            setQuantity(parseInt(parametros[1].split("=")[1]))
                        else
                            setQuantity(1);
                    }

                    setPrice(response.data.price)
                    setProductName(response.data.name)
                })
        }
    }, [])

    const handleSubmit = (values: FormValues): void =>
    {
        // Pega os dados dos inputs
        let {   
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

        // Calcula o frete e envia os dados requisitando uma url
        let ajax = new Ajax();
        ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+ "04510" +'&sCepOrigem='+ "89870000" +'&sCepDestino='+ cep +'&nVlPeso='+product?.peso+'&nCdFormato='+product?.formato+'&nVlComprimento='+product?.comprimento+'&nVlAltura='+product?.altura+'&nVlLargura='+product?.largura+'&nVlDiametro='+product?.diametro+'&sCdMaoPropria='+ "N" +'&nVlValorDeclarado='+0+'&sCdAvisoRecebimento='+"N"+'%20HTTP/1.1',
        (status:number, response:string) => {
            const freteInfo = (JSON.stringify(response));
            const freight = (freteInfo.substring(freteInfo.indexOf('<Valor>')+7, freteInfo.indexOf('</Valor>')));

            setFrete(freight)
            const freightPrice = parseFloat(freight.replace(",", "."));

            api.post('checkout', {
                id, price, freightPrice, productName, quantity,
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
                        freightPrice,
                  
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
                        price: parseFloat(price),
                        freightPrice: parseFloat(freightPrice),
                  
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
            <h2>Frete: {frete}</h2>
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