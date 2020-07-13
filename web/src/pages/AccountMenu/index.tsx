import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Footer from '../../partials/Footer/Footer';
import Header from '../../partials/Header/Header';
import { useAuth } from '../../contexts/auth'
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

interface FormValues {
    password: string;
    repeat_password: string;
    old_password: string;
}
  
const initialValues: FormValues = {
    password: "",
    repeat_password: "",
    old_password: "",
};

const VerifySchema = Yup.object().shape({
    password: Yup.string()
        .matches(/(?=.*[a-z])/, "A senha precisa ter ao menos uma letra")
        .matches(/(?=.*[0-9])/, "A senha precisa ter ao menos um número")
        .min(6, "A senha precisa ter ao menos 6 caracteres")
        .required("Obrigatório"),
    repeat_password: Yup.string()
        .oneOf([Yup.ref('password')], "As senhas precisam ser iguais")
        .required("Obrigatório"),
    old_password: Yup.string()
        .required("Obrigatório"),
});

const AccountMenu = () => 
{
    const { user } = useAuth();

    const [track, setTrack] = useState<boolean>(true);
    const [history, setHistory] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);
    const [delivered, setDelivered] = useState<SoldProduct | undefined>();
    const [products, setProducts] = useState<SoldProduct[]>([]);
    const [noneHistory, setNoneHistory] = useState<boolean>(true);  
    const [noneTrack, setNoneTrack] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false); //Animação de loading
    const [situation, setSituation] = useState<string>(''); // Situação: Senha alterada / erro

    // Carrega os produtos e vê se tem algum no histórico e no acompanhamento
    useEffect(() => {
        api.get('email/sold/'+user?.email)
            .then(response => {
                setProducts(response.data)
                setNoneHistory(!response.data.find((res:any) => res.delivered === true))
                setNoneTrack(!response.data.find((res:any) => !res.delivered === true))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // Modal que pede confirmação de que o produto foi entregue
    function modalDelivered()
    {
        if(delivered != undefined)
        {
            return(
                <div id="modal" className='delete-modal'>
                    <div className="content">
                        <div className="header">
                            <h1>Você já recebeu o seu produto?</h1>
                            <div className="buttons">
                                <button className="ok" onClick={wasDelivered}>Sim</button>
                                <button onClick={() => setDelivered(undefined)}>Não</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    // Faz um POST pra API para confirmar que o produto foi entregue
    function wasDelivered()
    {
        setDelivered(undefined)
        api.post('products/delivered', {id: delivered?.id})
            .then(res => {
                if(res.data.modificado)
                {
                    const updatedProducts = products.map(prod => {
                        if(prod.id != delivered?.id)
                            return prod;
                        else
                        {
                            prod.delivered = true;
                            return prod;
                        }
                    })
                    setProducts(updatedProducts)
                    setNoneHistory(!updatedProducts.find((res:any) => res.delivered === true))
                    setNoneTrack(!updatedProducts.find((res:any) => !res.delivered === true))
                }
                setDelivered(undefined)
            })
            .catch(err => {
                console.log(err);
                setDelivered(undefined)
            })
    }

    // Título da página
    function title()
    {
        if(track)
            return <h1>Acompanhar compra</h1>
        else if(history)
            return <h1>Histórico de compras</h1>
        else
            return <h1>Alterar senha</h1>
    }

    // Faz a requisição de mudança de senha
    const handleChangeInfo = (values: FormValues): void =>
    {
        setLoading(true)
        api.post('user/change_password', {email: user?.email, password: values.old_password, new_password: values.password})
            .then(res => {
                if(res.data.changed)
                    setSituation('ok')
                else
                    setSituation('error')

                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setSituation('error')
                console.log(err)
            })
    }

    // Mensagem de senha alterada
    function message()
    {
        if(situation === 'ok')
            return <p className="success detail">Senha alterada</p>
        else if(situation === 'error')
            return <p className="error detail">Falha na alteração de senha</p>
    }

    function changeButton()
    {
        if(!loading)
            return <button className="form-button" type="submit">Alterar senha</button>
        else
        {
            return(
                <div className="button-loading">
                    <button className="form-button" type="submit">Alterar senha</button>
                    <img src={load} alt="Carregando" width="40" height="40"/>
                </div>
            );
        }
    }

    // Conteúdo que é mostrado, dependendo do que está selecionado no menu
    function content()
    {
        if(track)
        {
            if(noneTrack)
            return(
                <div className="not-found">
                    Não há nenhum produto para ser acompanhado
                </div>
            );
            else
            {
                return(
                    <div className="products-list">
                        {products?.map(product => {
                            return (!product.delivered) ?
                            
                            <div className="sold-product">
                                <div className="image-title-price">
                                    <div className="image">
                                        <img src={product.image} width={100} height={100} alt={product.name}/>
                                    </div>
                                    <div className="title-price">
                                        <div className="title">{product.name} x{product.quantity}</div>
                                        <div className="price">R${(parseInt(product.quantity) * parseInt(product.price)).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="code">
                                    <p>Código de rastreamento:</p>
                                    <p>{product.code}</p>
                                    <button onClick={() => setDelivered(product)}>Recebi meu produto</button>
                                </div>
                            </div>
    
                            : <div></div>
                        })}
                    </div>
                );
            }
        }
        else if(history)
        {
            if(noneHistory)
                return(
                    <div className="not-found">
                        Nenhum produto encontrado no <br/> Histórico de compras
                    </div>
                );
            else
            {
                return(
                    <div className="products-list">
                        {products?.map(product => {
                            return (product.delivered) ?
        
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
                            </div>
        
                            : <div></div>
                        })}
                    </div>
                );
            }
        }
        else
        {
            return(
                <Formik
                initialValues={initialValues}
                onSubmit={handleChangeInfo}
                validationSchema={VerifySchema}
                >
                    {() => {
                        return (
                            <Form className="form">
                                <p className='detail'>Cadastre a sua nova senha</p>
                                <FormikField name="password" label="Nova senha " type="password"/>
                                <FormikField name="repeat_password" label="Confirme a nova senha" type="password" />
                                <p className='detail'>Confirme que é você com a sua senha atual</p>
                                <FormikField name="old_password" label="Senha atual" type="password" />
                                {changeButton()}
                                {message()}
                            </Form>
                        );
                    }}
                </Formik>
            );
        }
    }

    // Muda de tela com o clique no menu
    function handleTrackClick()
    {
        setTrack(true);
        setHistory(false);
        setChange(false);
    }

    // Muda de tela com o clique no menu
    function handleHistoryClick()
    {
        setTrack(false);
        setHistory(true);
        setChange(false);
    }

    // Muda de tela com o clique no menu
    function handleChangeClick()
    {
        setTrack(false);
        setHistory(false);
        setChange(true);
    }

    return(
        <div id="page-user-menu">
            <Header />
            <div className="content">
                <main>
                    <div className="menu">
                        <div className={`option ${track? 'selected' : ''}`} onClick={handleTrackClick}>Acompanhar compra</div>
                        <div className={`option ${history? 'selected' : ''}`} onClick={handleHistoryClick}>Histórico de compras</div>
                        <div className={`option ${change? 'selected' : ''}`} onClick={handleChangeClick}>Alterar senha</div>
                    </div>
                    <div className="info">
                        {title()}
                        {content()}
                    </div>
                </main>
            </div>
            <Footer />
            {modalDelivered()}
        </div>
    );
};

export default AccountMenu;