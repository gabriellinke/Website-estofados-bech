import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Footer from '../../partials/Footer/Footer';
import Header from '../../partials/Header/Header';
import api from '../../services/api';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikField from "../../components/FormikField";
import load from '../../assets/load2.gif';

import './styles.css';  //Importa o css

interface SoldProduct
{
    code: string;
    date: string;
    delivered: boolean;
    email: string;
    id: number;
    image: string;
    name: string;
    price: string;
    quantity: string;
}

interface UserProps {
    email: string;
    name: string;
    cpf: string;
    phone: string;
}

interface FormValues {
    email: string;
    date: string;
    code: string;
    id: string;
    quantity: string;
}
  
const initialValues: FormValues = {
    email: "",
    date: "",
    code: "",
    id: "",
    quantity: "",
};

const VerifySchema = Yup.object().shape({
    email: Yup.string()
        .required("Obrigatório"),
    date: Yup.string()
        .required("Obrigatório"),
    code: Yup.string()
        .required("Obrigatório"),
    id: Yup.string()
        .required("Obrigatório"),
    quantity: Yup.string()
        .required("Obrigatório"),
});

const Cart = () => 
{
    const [consult, setConsult] = useState<boolean>(true);
    const [create, setCreate] = useState<boolean>(false);
    const [list, setList] = useState<boolean>(false);
    const [products, setProducts] = useState<SoldProduct[]>([]);
    const [code, setCode] = useState<string>('');
    const [userMP, setUserMP] = useState<UserProps>();
    const [loading, setLoading] = useState<boolean>(false); //Animação de loading
    const [situation, setSituation] = useState<string>('');
    const [notAuthorized, setNotAuthorized] = useState<string>('');    // Diz se o usuário não é autorizado
    const [createData, setCreateData] = useState<FormValues>();    // Guarda os dados para ser usado se a primeira request não tiver sido autorizada
    const [email, setEmail] = useState<string>('');  // Email do usuário que se deseja acompanhar
    const [deleting, setDeleting] = useState<number>(0); //Animação de loading

   // Se houver algum problema de autorização, tenta pedir um novo token e fazer nova requisição.
    useEffect(() => {
        api.post('token', {token: localStorage.getItem('@EB:refreshToken')})
            .then(response => {
                api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                localStorage.setItem('@EB:accessToken', response.data.accessToken);
            })
            .catch(err => {
                console.log(err)
                alert('Erro de autenticação, tente relogar. Se o erro persistir, contate o desenvolvedor');
            })
                
        if(notAuthorized === 'create')
        {
            api.post('products/sold', {email: createData?.email, quantity: createData?.quantity, date: createData?.date, code: createData?.code, id: createData?.id})
                .then(response => {
                    setLoading(false);
                    if(response.data.product !== undefined)
                        setSituation('ok')
                    else
                        setSituation('error')
                })
                .catch(err => {
                    setLoading(false);
                    setSituation('error')
                    console.log(err)
                })
        }
        else if(notAuthorized === 'delete')
        {
            api.post('products/sold/delete', {id: deleting})
                .then(response => {
                    if(!response.data.removed)
                        alert("Erro ao deletar produto");
                    setDeleting(0);

                    api.get('email/sold/' + email)
                    .then(response => {
                        setProducts(response.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err);
                    setDeleting(0); 
                })
        }
    }, [notAuthorized])

    // Título da página
    function title()
    {
        if(consult)
            return <h1>Consultar dados do comprador</h1>
        else if(create)
            return <h1>Cadastrar produto para acompanhamento</h1>
        else
            return <h1>Listar produtos em acompanhamento de um usuário</h1>
    }

    // Muda o código do input
    function handleCodeInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        const { value } = event.target;
        setCode(value);
    }

    // Muda o email do input
    function handleEmailInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        const { value } = event.target;
        setEmail(value);
    }

    // Faz requisição para consultar as informações do comprador
    function ConsultCode(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        setLoading(true);

        var requestURL = `https://api.mercadopago.com//v1/payments/${code}?access_token=APP_USR-3814211000061967-062720-ca7c62479c499858b60415eae08bb2a1-593717889`;
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        try
        {
            request.onload = function() {
                try
                {
                    if(request.status === 200)
                    {
                        if(request.response.payer != null)
                        {
                            let email = request.response.payer.email;
                            let name = `${request.response.payer.first_name} ${request.response.payer.last_name}`;
                            let cpf = request.response.payer.identification.number;
                            let phone = `(${request.response.payer.phone.area_code}) ${request.response.payer.phone.number}`
                            setUserMP({email, name, cpf, phone});
                        }
                    }
                    else
                    {
                        alert('Erro ao consultar o código')
                    }
                }
                catch
                {
                    alert('Erro ao consultar o código')
                }
                setLoading(false)
            }
        }
        catch
        {
            alert('Erro ao consultar o código')
        }
    }

    // Botão com loading
    function loadingImage()
    {
        if(loading)
        return(
            <img src={load} alt="Carregando" width="52.4" height="52.4"/>
        );
    }

    // Informações do comprador
    function userInfo()
    {
        if(userMP != undefined)
            return(
                <div className="user-info">
                    <div className="name">Nome: {userMP.name}</div>
                    <div className="email">Email: {userMP.email}</div>
                    <div className="phone">Telefone: {userMP.phone}</div>
                    <div className="cpf">CPF: {userMP.cpf}</div>
                </div>
            );
    }

    function message()
    {
        if(situation === 'ok')
            return <p className="detail success">Cadastrado com sucesso</p>
        if(situation === 'error')
            return <p className="detail error">Erro ao cadastrar</p>
    }

    const handleCreateProduct = (values: FormValues): void =>
    {
        setLoading(true)
        setCreateData({email: values.email, quantity: values.quantity, date: values.date, code: values.code, id: values.id});
        api.post('products/sold', {email: values.email, quantity: values.quantity, date: values.date, code: values.code, id: values.id})
            .then(response => {
                setLoading(false);
                if(response.data.product !== undefined)
                    setSituation('ok')
                else
                    setSituation('error')
            })
            .catch(err => {
                setNotAuthorized('create')
                console.log(err)
            })
    }

    function handleList(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        setLoading(true);
        api.get('email/sold/' + email)
            .then(response => {
                setProducts(response.data)
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
    }

    function delivered(delivered: boolean)
    {
        return delivered? <p>Sim</p> : <p>Não</p>
    }

    // Modal que pede confirmação de que o produto foi entregue
    function modalDelete()
    {
        if(deleting > 0)
        {
            return(
                <div id="modal" className='delete-modal'>
                    <div className="content">
                        <div className="header">
                            <h1>Deseja deletar o produto do histórico de compras?</h1>
                            <div className="buttons">
                                <button className="ok" onClick={() => deleteProduct()}>Sim</button>
                                <button onClick={() => setDeleting(0)}>Não</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    function deleteProduct()
    {
        api.post('products/sold/delete', {id: deleting})
            .then(response => {
                if(!response.data.removed)
                    alert("Erro ao deletar produto")
                setDeleting(0);

                api.get('email/sold/' + email)
                .then(response => {
                    setProducts(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
                setNotAuthorized('delete')
            })
    }

    function userProducts()
    {
        return(
            <div className="products-list">
                {products?.map(product => {
                    return(
                        <div className="sold-product">
                            <div className="image-title-price">
                                <div className="image">
                                    <img src={product.image} width={100} height={100} alt={product.name}/>
                                </div>
                                <div className="title-price">
                                    <div className="title">{product.name} x{product.quantity}</div>
                                    <div className="price">R${parseInt(product.price).toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="date">
                                <p>Data da compra:</p>
                                <p>{product.date}</p>
                            </div>
                            <div className="code">
                                <p>Código de rastreamento:</p>
                                <p>{product.code}</p>
                            </div>
                            <div className="delivered">
                                <p>Produto entregue: </p>
                                {delivered(product.delivered)}
                            </div>
                            <p className="delete-product" onClick={() => setDeleting(product.id)}>X</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    // Conteúdo que é mostrado, dependendo do que está selecionado no menu
    function content()
    {
        if(consult)
        {
            return (
                <div className="consult">
                    <p>Insira o código da compra do Mercado Pago:</p>
                    <form onSubmit={ConsultCode} id='form'>
                        <input type="text" name="mp-code" onChange={handleCodeInputChange}/>
                        <button>Consultar</button>
                        {loadingImage()}
                    </form>
                    {userInfo()}
                </div>
            );
        }
        else if(create)
        {
            return(
                <Formik
                initialValues={initialValues}
                onSubmit={handleCreateProduct}
                validationSchema={VerifySchema}
                >
                    {() => {
                        return (
                            <Form className="form-create">
                                <FormikField name="email" label="Email do usuário"/>
                                <FormikField name="date" label="Data da compra"/>
                                <FormikField name="code" label="Código de rastreamento"/>
                                <FormikField name="id" label="ID do produto"/>
                                <FormikField name="quantity" label="Quantidade comprada"/>
                                <div className="button-create">
                                    <button>Cadastrar</button>
                                    {loadingImage()}
                                    {message()}
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            );
        }
        else
        {
            return (
                <div className="consult">
                    <p>Insira o email do usuário que deseja acompanhar:</p>
                    <form onSubmit={handleList} id='form'>
                        <input type="text" name="list-email" onChange={handleEmailInputChange}/>
                        <button>OK</button>
                        {loadingImage()}
                    </form>
                    {userProducts()}
                </div>
            );

        }
    }

    // Muda de tela com o clique no menu
    function handleConsultClick()
    {
        setConsult(true);
        setCreate(false);
        setList(false);
    }

    // Muda de tela com o clique no menu
    function handleCreateClick()
    {
        setConsult(false);
        setCreate(true);
        setList(false);
    }

    // Muda de tela com o clique no menu
    function handleListClick()
    {
        setConsult(false);
        setCreate(false);
        setList(true);
    }

    return(
        <div id="page-user-menu-admin">
            <Header />
            <div className="content">
                <main>
                    <div className="menu">
                        <div className={`option ${consult? 'selected' : ''}`} onClick={handleConsultClick}>Consultar dados do comprador</div>
                        <div className={`option ${create? 'selected' : ''}`} onClick={handleCreateClick}>Cadastrar produto para acompanhamento</div>
                        <div className={`option ${list? 'selected' : ''}`} onClick={handleListClick}>Listar produtos em acompanhamento de um usuário</div>
                    </div>
                    <div className="info">
                        {title()}
                        {content()}
                    </div>
                </main>
            </div>
            <Footer />
            {modalDelete()}
        </div>
    );
};

export default Cart;