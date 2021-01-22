import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikField from "../../components/FormikField";
import Ajax from '../../services/ajax'
import { useAuth } from '../../contexts/auth'
import { useHistory } from "react-router-dom";

import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import load from '../../assets/load2.gif';

import './styles.css';  //Importa o css

interface CheckoutPostData
{
    id: string;
    productName: string;
    quantity: string;
    price: string;
    condition: string;
    freightPrice: number;

    name: string;
    surname: string;
    email: string;
    area_code: string;
    phone: number;
    cpf: string;

    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    adjunct: string;

    userId: number;
    userName: string;
    userSurname: string;
    userEmail: string;
};

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
    const { signOut } = useAuth();
    const history = useHistory();

    const [products, setProducts] = useState<ProductProps[]>([]); //Guardar a lista de produtos
    const [ids, setIds] = useState<string[]>([]); 
    const [prices, setPrices] = useState<number[]>([]); // Guarda o preço de cada produto
    const [productNames, setProductNames] = useState<string[]>([]); // Guarda o nome de cada produto
    const [images, setImages] = useState<string[]>([]);  // Guarda a imagem de cada produto
    const [quantitys, setQuantitys] = useState<number[]>([]);   // Guarda a quantidade de cada produto
    const [conditions, setConditions] = useState<string[]>([]);   // Guarda a quantidade de parcelas possíveis de cada produto
    const [totalQuantity, setTotalQuantity] = useState<number[]>([]); // Guarda a quantidade de produtos na lista de checkout
    const [totalPrice, setTotalPrice] = useState<number>(0);    // Guarda o preço total, somando todos os produtos
    const [notAuthorized, setNotAuthorized] = useState<number>(0);    // Diz se o usuário não é autorizado
    
    const [link, setLink] = useState<string>("#"); // Onde fica salvo o link para o redirecionamento para a compra
    const [checkoutData, setCheckoutData] = useState<Data>(); // Dados que vão ser usados para criar um aviso de nova compra no banco de dados e email
    const [checkoutPostData, setCheckoutPostData] = useState<CheckoutPostData>(); // Guarda os dados que vão para o post do checkout, para usar nos casos de falha de autorização
    const [disabled, setDisabled] = useState<boolean>(true); // Habilita/desabilita o botão de Pagar com Mercado Pago
    const [frete, setFrete] = useState<number>(0);  // Salva o custo do frete
    const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false); // Diz se precisa ou não mostrar animação de carregamento
    const { user } = useAuth(); // Pega os dados do usuário

     // Quando o usuário confirmar seus dados, vai ser realizado um POST para a API salvar os dados no BD e vai habilitar o botão de pagamento
    useEffect(() => {
        if(checkoutData)
            if(!(frete>0)) alert("Erro ao calcular o frete");
            else
                api.post('checkout/data', checkoutData)
                    .then(response => {
                        history.push('/buying/confirm');
                        setLoadingConfirm(false);
                        setDisabled(false);
                    })
        setLoadingConfirm(false);
    }, [checkoutData])

    // Ao entrar na página carrega os dados da URL, o id do produto e a quantidade de produtos que o usuário quer comprar
    useEffect(() => {
        let idURL = localStorage.getItem('@EB:id');
        let qtdsURL = localStorage.getItem('@EB:quantity');
        let storagedId = '';
        let storagedQuantity = '';

        if(idURL && qtdsURL)
        {
            storagedId = idURL;
            storagedQuantity = qtdsURL;
        }

        // Consulta a api com os ids dos produtos que vieram como parâmetro
        api.post('/products/list', {products: `${storagedId}`})
            .then(response => {
                const productsAux = response.data.products   // Guarda os produtos em uma variável
                setProducts(productsAux)
            
                // Tenho um problema com relação aos ids: Se mudaram a url, não podem botar uma quantidade maior do que o estoque do produto
                // Porém, tem como botar o mesmo id mais de uma vez, o que faria com que desse, por ex, pra comprar a quantidade máxima do produto 2x
                setIds(storagedId.split("-"))

                let quantidadeFinal = [0]; // Guarda a quantidade de unidades de cada produto

                let qtds = storagedQuantity.split("-");   // Separa a quantidade de cada produto em um vetor
                let param = qtds.map(qtd => {
                    return parseInt(qtd);
                })

                let l = 0;
                let quantidadeDeProdutos = [0];    // Salva a quantidade total de produtos
                for(let iterator of param)  // Salva a quantidade do produto como a que veio da URL ou a máx disponível
                {
                    if(productsAux[l])
                    {
                        quantidadeFinal[l] = (parseInt(productsAux[l].quantity) > iterator) ? iterator : parseInt(productsAux[l].quantity);
                    }
                    quantidadeDeProdutos[l] = l;
                    l++;
                }

                setTotalQuantity(quantidadeDeProdutos);
                setQuantitys(quantidadeFinal);

                let i = 0;
                let precoFinal = [0];   // Salva o preço de cada produto
                let parcelaFinal = [""];   // Salva as parcelas
                let nomeFinal = [""];   // Salva o nome de cada produto
                for(let prod of productsAux)
                {
                    parcelaFinal[i] = prod.conditions;
                    precoFinal[i] = prod.price;
                    nomeFinal[i] = prod.name;
                    i++;
                }
                setConditions(parcelaFinal)
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
    }, [])

    // Se houver algum problema de autorização, tenta pedir um novo token e fazer nova requisição. Se der problema, desloga o usuário.
    useEffect(() => {
        if(notAuthorized === 1)
        {
            api.post('token', {token: localStorage.getItem('@EB:refreshToken')})
                .then(response => {
                    api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                    localStorage.setItem('@EB:accessToken', response.data.accessToken);

                    api.post('/checkout', checkoutPostData)
                        .then(response => {
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

                            localStorage.setItem('@EB:checkoutData', "");
                            localStorage.setItem('@EB:checkoutData', JSON.stringify(response.data.checkoutInfo));
                        })
                        setNotAuthorized(0);
                })
                .catch(err => {
                    signOut();
                    console.log(err)
                })
        }
    }, [notAuthorized])

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

        let freightPrice = calcularFrete(cep);
        setFrete(freightPrice);

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
        let id="", price="", productName="", quantity="", condition="";
        for(let i of totalQuantity)
        {
            id += ids[i] + "@"
            price += prices[i] + "@"
            productName += productNames[i] + "@"
            quantity += quantitys[i] + "@"
            condition += conditions[i] + "@"
        }

        // Remove o último @
        id = id.substring(0,(id.length - 1));
        price = price.substring(0,(price.length - 1));
        productName = productName.substring(0,(productName.length - 1));
        quantity = quantity.substring(0,(quantity.length - 1));
        condition = condition.substring(0,(condition.length - 1));

        // Salva esses dados, para caso de algum problema de autorização
        setCheckoutPostData({
            id, price, freightPrice, productName, quantity, condition,
            name, surname, email, phone: parseInt(phone), cpf, area_code,
            cep, state, city, neighborhood, street, number, adjunct,
            userId: userNotNull.id, userName: userNotNull.name, userSurname: userNotNull.surname, userEmail: userNotNull.email
        })

        // Dá um post para criar uma preference do Mercado Pago
        api.post('checkout', {
            id, price, freightPrice, productName, quantity, condition,
            name, surname, email, phone: parseInt(phone), cpf, area_code,
            cep, state, city, neighborhood, street, number, adjunct,
            userId: userNotNull.id, userName: userNotNull.name, userSurname: userNotNull.surname, userEmail: userNotNull.email
        })
            .then(response => {
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

                localStorage.setItem('@EB:checkoutData', "");
                localStorage.setItem('@EB:checkoutData', JSON.stringify(response.data.checkoutInfo));
        })
        .catch(err => {
            console.log(err);
            setNotAuthorized(1);
        })
    }

    function calcularFrete(cep: string) {  
        let volume = 0;
        let peso = 0;
        let totalFreight = 0;

        for(let i=0; i<products.length; i++)
        {
            volume += products[i].altura * products[i].largura * products[i].comprimento * quantitys[i];
            peso += quantitys[i] * products[i].peso;
        }

        //Cargas limitadas pelo peso
        if(peso/(Math.max(1,Math.floor(volume/216000))) > 30)
        {
            let cargas = Math.ceil(peso/30);
            let dimensao = Math.cbrt(volume)/cargas;

            let ajax = new Ajax();
            // Precisa fazer um cálculo real, com todos os produtos levados em conta
            ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+ "04510" +
                '&sCepOrigem='+ "89870000" +
                '&sCepDestino='+ cep +
                '&nVlPeso='+peso/cargas+
                '&nCdFormato='+1+
                '&nVlComprimento='+Math.max(dimensao, 15)+
                '&nVlAltura='+Math.max(dimensao, 1)+
                '&nVlLargura='+Math.max(dimensao, 10)+
                '&nVlDiametro='+10+
                '&sCdMaoPropria='+ "N" +
                '&nVlValorDeclarado='+0+
                '&sCdAvisoRecebimento='+"N" +'%20HTTP/1.1',
            (status:number, response:string) => 
            {
                const freteInfo = (JSON.stringify(response));
                const freight = (freteInfo.substring(freteInfo.indexOf('<Valor>')+7, freteInfo.indexOf('</Valor>')));
                const freightPrice = cargas * parseFloat(freight.replace(",", "."));
                totalFreight = freightPrice;
                // setFrete(freightPrice);
                console.log("cargas: ", cargas, 'frete:', freightPrice, 'dimensao:', dimensao);

            })
        }
        else //cargas limitadas pelo volume
        {
            let cargasCompletas = Math.floor(volume/216000);
            let restante = volume%216000;

            let ajax = new Ajax();
            // Requisição de cargas completas
            cargasCompletas > 0 &&
            ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+ "04510" +
                '&sCepOrigem='+ "89870000" +
                '&sCepDestino='+ cep +
                '&nVlPeso='+peso/(cargasCompletas+1)+
                '&nCdFormato='+1+
                '&nVlComprimento='+60+
                '&nVlAltura='+60+
                '&nVlLargura='+60+
                '&nVlDiametro='+10+
                '&sCdMaoPropria='+ "N" +
                '&nVlValorDeclarado='+0+
                '&sCdAvisoRecebimento='+"N" +'%20HTTP/1.1',
            (status:number, response:string) => 
            {
                const freteInfo = (JSON.stringify(response));
                const freight = (freteInfo.substring(freteInfo.indexOf('<Valor>')+7, freteInfo.indexOf('</Valor>')));
                const freightPrice = cargasCompletas * parseFloat(freight.replace(",", "."));
                totalFreight += freightPrice;
                // setFrete(totalFreight);
                console.log('frete cargas completas:', freightPrice);
            })

            // Requisição para o volume restante
            ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+ "04510" +
                '&sCepOrigem='+ "89870000" +
                '&sCepDestino='+ cep +
                '&nVlPeso='+peso/(cargasCompletas+1)+
                '&nCdFormato='+1+
                '&nVlComprimento='+Math.max(Math.cbrt(restante), 15)+
                '&nVlAltura='+Math.max(Math.cbrt(restante), 1)+
                '&nVlLargura='+Math.max(Math.cbrt(restante), 10)+
                '&nVlDiametro='+10+
                '&sCdMaoPropria='+ "N" +
                '&nVlValorDeclarado='+0+
                '&sCdAvisoRecebimento='+"N" +'%20HTTP/1.1',
            (status:number, response:string) => 
            {
                const freteInfo = (JSON.stringify(response));
                const freight = (freteInfo.substring(freteInfo.indexOf('<Valor>')+7, freteInfo.indexOf('</Valor>')));
                const freightPrice = parseFloat(freight.replace(",", "."));
                totalFreight += freightPrice;
                // setFrete(totalFreight);
                console.log('frete restante:', freightPrice);
            })
        }
        return totalFreight;
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
                                                    <h3>Dados do comprador</h3>
                                                    <FormikField name="name" label="Nome"/>
                                                    <FormikField name="surname" label="Sobrenome"/>
                                                    <FormikField name="cpf" label="CPF"/>
                                                </div>
                                                <div className="delivery-info">
                                                    <h3>Endereço de entrega</h3>
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
                        </div>
                    </div>
                </main>
            </div>    
            <Footer />
        </div>
    );
};

export default Checkout;