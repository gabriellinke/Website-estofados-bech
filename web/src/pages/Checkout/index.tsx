import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikField from "../../components/FormikField";
import Ajax from '../../services/ajax'
import { useAuth } from '../../contexts/auth'

import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import load from '../../assets/load2.gif';

import './styles.css';  //Importa o css

interface User{
    id: number;
    name: string;
    surname: string;
    email: string;
    admin: boolean;
}

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

    userId: number;
    userName: string;
    userSurname: string;
    userEmail: string;
};

// Propriedades que tem no produto
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

// Tipos dos valores que os inputs irão receber
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

// Valores iniciais dos inputs
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

// Esquema de validação dos inputs
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
    const [product, setProduct] = useState<ProductProps>(); //Guardar a lista de produtos

    const [link, setLink] = useState<string>("#"); // Onde fica salvo o link para o redirecionamento para a compra
    const [id, setId] = useState<string>("0"); // Salva o id do produto
    const [price, setPrice] = useState<number>(999999); // Salva o preço do produto
    const [productName, setProductName] = useState<string>(""); // Salva o nome do produto
    const [quantity, setQuantity] = useState<number>(0); // Salva a quantidade que o usuário quer comprar do produto
    const [checkoutData, setCheckoutData] = useState<Data>(); //
    const [disabled, setDisabled] = useState<boolean>(true); // Habilita/desabilita o botão de Pagar com Mercado Pago
    const [image, setImage] = useState<string>(""); // Mostra a imagem do produto na área de informações
    const [frete, setFrete] = useState<number>(0);  // Salva o custo do frete
    const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false); // Diz se precisa ou não mostrar animação de carregamento
    const { user } = useAuth(); // Pega os dados do usuário

    // Quando o usuário confirmar seus dados, vai ser realizado um POST para a API salvar os dados no BD e vai habilitar o botão de pagamento
    useEffect(() => {
        api.post('checkout/data', checkoutData)
            .then(response => {
                // console.log(response);
                setLoadingConfirm(false);
                setDisabled(false);
            })
    }, [checkoutData])

    // Ao entrar na página carrega os dados da URL, o id do produto e a quantidade de produtos que o usuário quer comprar
    useEffect(() => {
        let res = window.location.href.split('?');
        if(res[1])
        {
            // Pega a parte da url que interessa, que é onde tem os parâmetros
            let parametros = res[1].split('&');

            // O primeiro parâmetro é o id
            if(parametros[0] !== null)
                setId(parametros[0].split("=")[1])

            // Consulta a api com o id do produto que veio como parâmetro
            api.get('/products/'+parametros[0].split("=")[1])
                .then(response => {
                    setProduct(response.data);

                    // O segundo parâmetro é a quantidade de produtos que o usuário quer comprar.
                    // Assim, verifica-se se tem essa quantidade disponível senão, seta a quantidade como a máxima quantidade disponível
                    if(parametros[1])
                    {
                        if((parseInt(parametros[1].split("=")[1])) <= response.data.quantity)
                            setQuantity(parseInt(parametros[1].split("=")[1]))
                        else
                            setQuantity(response.data.quantity);
                    }

                    // Seta o preço e o nome do produto
                    setPrice(response.data.price)
                    setProductName(response.data.name)

                    // Seta a imagem. Se tiver mais que uma imagem, a primeira que aparecer é a que vai ser utilizada
                    if(response.data.images.indexOf(",") > 0)
                        setImage(response.data.images.substring(0, response.data.images.indexOf(","))); 
                    else
                        setImage(response.data.images);
                })
        }
    }, [])

    // Ação feita ao confirmar os dados
    const handleSubmit = (values: FormValues): void =>
    {
        setLoadingConfirm(true);    // Desativo o loading no momento que vou liberar o botão
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

        let ajax = new Ajax();
        ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+ "04510" +'&sCepOrigem='+ "89870000" +'&sCepDestino='+ cep +'&nVlPeso='+product?.peso+'&nCdFormato='+product?.formato+'&nVlComprimento='+product?.comprimento+'&nVlAltura='+product?.altura+'&nVlLargura='+product?.largura+'&nVlDiametro='+product?.diametro+'&sCdMaoPropria='+ "N" +'&nVlValorDeclarado='+0+'&sCdAvisoRecebimento='+"N"+'%20HTTP/1.1',
        (status:number, response:string) => {
            // Calcula o frete e coloca numa variável
            const freteInfo = (JSON.stringify(response));
            const freight = (freteInfo.substring(freteInfo.indexOf('<Valor>')+7, freteInfo.indexOf('</Valor>')));
            const freightPrice = parseFloat(freight.replace(",", "."));
            setFrete(freightPrice)

            // Pega os dados do usuário que está realizando a compra
            let userNotNull:User = {
                id: 0,
                name: "Valor padrão",
                surname: "Valor padrão",
                email: "Valor padrão",
                admin: false,
            };
            if(user != null)
                userNotNull = user;

            // Dá um post para criar uma preference do Mercado Pago
            api.post('checkout', {
                id, price, freightPrice, productName, quantity,
                name, surname, email, phone: parseInt(phone), cpf, area_code,
                cep, state, city, neighborhood, street, number, adjunct,
                userId: userNotNull.id, userName: userNotNull.name, userSurname: userNotNull.surname, userEmail: userNotNull.email
            })
                .then(response => {
                    // console.log(response.data);
                    // Seta o link do botão e consequentemente libera o seu uso
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

                        userId,
                        userName,
                        userSurname,
                        userEmail,
                      } = response.data.checkoutInfo;

                    // Salva os dados da preference e do comprador para que os dados possam ser salvos no banco de dados
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

                    userId,
                    userName,
                    userSurname,
                    userEmail,
                    })
            })
        })
    }

    // Retorna o botão de pagamento, verificando se ele deve estar habilitado ou não
    function buttonMercadoPago()
    {
        if(disabled)
            return (
            <div className="payment-button">
                <p>Confirme seus dados para habilitar o pagamento</p>
                <div className="confirm">
                    <a href={`${link}`}>
                        <button disabled className="disabled">Pagar com Mercado Pago</button>
                    </a>
                    {loading()}
                </div>
            </div>
            );
        else
            return (
                    <div className="payment-button">
                        <div className="confirm">
                            <a href={`${link}`}>
                                <button className="normal">Pagar com Mercado Pago</button>
                            </a>
                            {loading()}
                        </div>
                    </div>
                    );
    }

    // Mostra as animações de loading
    function loading()
    {
        if(loadingConfirm)
        return(
            <img src={load} alt="Carregando" width="52.4" height="52.4"/>
        );
    }

    return(
        <div id="page-checkout">
            <Header />
            <div className="content">
                <main>
                    <h1>Finalizando a compra</h1>
                    <div className="grid">
                        <div className="user-info">
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={CheckoutSchema}
                            >
                                {() => {
                                    return (
                                        <div>
                                            <Form className="form">
                                                <div className="contact">
                                                    <h3>Dados de contato</h3>
                                                    <FormikField name="email" label="Email"/>
                                                    <div className="field-group-phone">
                                                        <FormikField name="area_code" label="DDD"/>
                                                        <FormikField name="phone" label="Telefone"/>
                                                    </div>
                                                </div>
                                                <div className="personal-info">
                                                    <h3>Dados do destinatário</h3>
                                                    <FormikField name="name" label="Nome"/>
                                                    <FormikField name="surname" label="Sobrenome"/>
                                                    <FormikField name="cpf" label="CPF"/>
                                                </div>
                                                <div className="delivery-info">
                                                    <h3>Endereço do destinatário</h3>
                                                    <FormikField name="cep" label="CEP"/>
                                                    <FormikField name="state" label="Estado"/>
                                                    <FormikField name="city" label="Cidade"/>
                                                    <FormikField name="neighborhood" label="Bairro"/>
                                                    <FormikField name="street" label="Rua"/>
                                                    <FormikField name="number" label="Número"/>
                                                    <FormikField name="adjunct" label="Complemento"/>
                                                </div>

                                                <div className="confirm">
                                                    <button className="normal" type="submit">Confirmar dados</button>
                                                    {loading()}
                                                </div>
                                            </Form>
                                        </div>
                                    );
                                }}
                            </Formik>
                        </div>
                        <div className="product-info-button">
                            <div className="product-info">
                                <div className="general-info">
                                    <img src={image} alt="Imagem do produto"/>
                                    <div className="name-price">
                                        <div className="name">{product?.name} x{quantity}</div>
                                        <div className="price">R${((Number)(product?.price)*(Number)(quantity)).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="costs">
                                    <div className="subtotal">
                                        <div className="name">Subtotal</div>
                                        <div className="price">R${((Number)(product?.price)*(Number)(quantity)).toFixed(2)}</div>
                                    </div>
                                    <div className="freight">
                                        <div className="name">Custo do frete</div>
                                        <div className="price">R${frete.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="total-costs">
                                    <div className="name">Total</div>
                                    <div className="price">R${(((Number)(product?.price)*(Number)(quantity))+(frete)).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="mercado-pago-button">
                                {buttonMercadoPago()}
                            </div>
                        </div>
                    </div>
                </main>
            </div>    
            <Footer />
        </div>
    );
};

export default Checkout;