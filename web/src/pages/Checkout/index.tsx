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

    const [products, setProducts] = useState<ProductProps[]>([]); //Guardar a lista de produtos
    const [ids, setIds] = useState<string[]>([]); 
    const [prices, setPrices] = useState<number[]>([]); // Guarda o preço de cada produto
    const [productNames, setProductNames] = useState<string[]>([]); // Guarda o nome de cada produto
    const [images, setImages] = useState<string[]>([]);  // Guarda a imagem de cada produto
    const [quantitys, setQuantitys] = useState<number[]>([]);   // Guarda a quantidade de cada produto
    const [totalQuantity, setTotalQuantity] = useState<number[]>([]); // Guarda a quantidade de produtos na lista de checkout
    const [totalPrice, setTotalPrice] = useState<number>(0);    // Guarda o preço total, somando todos os produtos
    
    const [link, setLink] = useState<string>("#"); // Onde fica salvo o link para o redirecionamento para a compra
    const [checkoutData, setCheckoutData] = useState<Data>(); //
    const [disabled, setDisabled] = useState<boolean>(true); // Habilita/desabilita o botão de Pagar com Mercado Pago
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

            const idURL = parametros[0].split("=")[1];  //Variável que tem os ids que vem da url
            const qtdsURL = parametros[1].split("=")[1];   //Variável que tem as quantidades que vem da url

            // Consulta a api com os ids dos produtos que vieram como parâmetro
            api.post('/products/list', {products: `${idURL}`})
                .then(response => {
                    const productsAux = response.data.products   // Guarda os produtos em uma variável
                    setProducts(productsAux)
                
                    // Tenho um problema com relação aos ids: Se mudaram a url, não podem botar uma quantidade maior do que o estoque do produto
                    // Porém, tem como botar o mesmo id mais de uma vez, o que faria com que desse, por ex, pra comprar a quantidade máxima do produto 2x
                    setIds(idURL.split("-"))

                    let quantidadeFinal = [0]; // Guarda a quantidade de unidades de cada produto
                    if(parametros[1])   // Para não dar problema caso não venha o parametro de quantidade
                    {
                        let qtds = qtdsURL.split("-");   // Separa a quantidade de cada produto em um vetor
                        let param = qtds.map(qtd => {
                            return parseInt(qtd);
                        })

                        let i = 0;
                        let quantidadeDeProdutos = [0];    // Salva a quantidade total de produtos
                        for(let iterator of param)  // Salva a quantidade do produto como a que veio da URL ou a máx disponível
                        {
                            if(productsAux[i])
                            {
                                quantidadeFinal[i] = (parseInt(productsAux[i].quantity) > iterator) ? iterator : parseInt(productsAux[i].quantity);
                            }
                            quantidadeDeProdutos[i] = i;
                            i++;
                        }

                        setTotalQuantity(quantidadeDeProdutos);
                        setQuantitys(quantidadeFinal);
                    }

                    let i = 0;
                    let precoFinal = [0];   // Salva o preço de cada produto
                    let nomeFinal = [""];   // Salva o nome de cada produto
                    for(let prod of productsAux)
                    {
                        precoFinal[i] = prod.price;
                        nomeFinal[i] = prod.name;
                        i++;
                    }
                    setPrices(precoFinal)
                    setProductNames(nomeFinal)

                    let k = 0;
                    let precoXquantidade = [0];     // Auxiliar pra achar a soma dos preços dos produtos
                    for(let preco of precoFinal)
                    {
                        precoXquantidade[k] = preco * quantidadeFinal[k];
                        k++;
                    }

                    const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue;
                    setTotalPrice(precoXquantidade.reduce(reducer))  // Salva como o preço total a soma de todos os preços

                    let j = 0;
                    let imagemFinal = [""];     // Salva a imagem do produto
                    for(let prod of productsAux)
                    {
                        if(prod.images.indexOf(",") > 0)
                            imagemFinal[j] = prod.images.substring(0, prod.images.indexOf(",")); 
                        else
                            imagemFinal[j] = prod.images;

                        j++;
                    }
                    setImages(imagemFinal);
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
        // Precisa fazer um cálculo real, com todos os produtos levados em conta
        ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+ "04510" +'&sCepOrigem='+ "89870000" +'&sCepDestino='+ cep +'&nVlPeso='+products[0]?.peso+'&nCdFormato='+products[0]?.formato+'&nVlComprimento='+products[0]?.comprimento+'&nVlAltura='+products[0]?.altura+'&nVlLargura='+products[0]?.largura+'&nVlDiametro='+products[0]?.diametro+'&sCdMaoPropria='+ "N" +'&nVlValorDeclarado='+0+'&sCdAvisoRecebimento='+"N"+'%20HTTP/1.1',
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

            // Concatena os items em uma string, separando-os por @
            let id="", price="", productName="", quantity="";
            for(let i of totalQuantity)
            {
                id += ids[i] + "@"
                price += prices[i] + "@"
                productName += productNames[i] + "@"
                quantity += quantitys[i] + "@"
            }

            // Remove o último @
            id = id.substring(0,(id.length - 1));
            price = price.substring(0,(price.length - 1));
            productName = productName.substring(0,(productName.length - 1));
            quantity = quantity.substring(0,(quantity.length - 1));

            // Dá um post para criar uma preference do Mercado Pago
            api.post('checkout', {
                id, price, freightPrice, productName, quantity,
                name, surname, email, phone: parseInt(phone), cpf, area_code,
                cep, state, city, neighborhood, street, number, adjunct,
                userId: userNotNull.id, userName: userNotNull.name, userSurname: userNotNull.surname, userEmail: userNotNull.email
            })
                .then(response => {
                    console.log(response.data);
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
                                {totalQuantity.map(num => {
                                    return(
                                    <div className="general-info">
                                        <img src={images[num]} alt="Imagem do produto"/>
                                        <div className="name-price">
                                            <div className="name">{productNames[num]} x{quantitys[num]}</div>
                                            <div className="price">R${((Number)(prices[num])*(Number)(quantitys[num])).toFixed(2)}</div>
                                        </div>
                                    </div>
                                    );
                                })}
                                <div className="costs">
                                    <div className="subtotal">
                                        <div className="name">Subtotal</div>
                                        <div className="price">R${(totalPrice).toFixed(2)}</div>
                                    </div>
                                    <div className="freight">
                                        <div className="name">Custo do frete</div>
                                        <div className="price">R${frete.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="total-costs">
                                    <div className="name">Total</div>
                                    <div className="price">R${((totalPrice)+(frete)).toFixed(2)}</div>
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