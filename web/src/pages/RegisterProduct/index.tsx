import React, { useState, useEffect, ChangeEvent } from 'react'
import { useHistory } from "react-router-dom";
import check from '../../assets/check.svg';
import Footer from '../../partials/Footer/Footer';
import Header from '../../partials/Header/Header';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikField from "../../components/FormikField";
import Dropzone from '../../components/Dropzone'
import api from '../../services/api'

import './styles.css';  //Importa o css

// Tipos dos valores que os inputs irão receber
interface FormValues {
    name: string;
    price: number;
    conditions: number;
    quantity: number;
    category: string;

    peso: number;
    comprimento: number;
    altura: number;
    largura: number;
    diametro: number;
};

// Valores iniciais dos inputs
const initialValues: FormValues = {
    name: "",
    price: 0.00,
    conditions: 0,
    quantity: 0,
    category: "",

    peso: 1,
    comprimento: 16,
    altura: 2,
    largura: 11,
    diametro: 5, 
};

// Esquema de validação dos inputs
const CheckoutSchema = Yup.object().shape({
    name: Yup.string()
        .required("Obrigatório"),
    price: Yup.number()
        .required("Obrigatório")
        .min(1, "É necessário ter um preço")
        .typeError("Escreva somente números. Use pontos e não vírgulas."),
    conditions: Yup.number()
        .required("Obrigatório")
        .min(1, "Mínimo 1")
        .typeError("É necessário ser um número")
        .integer("Precisa ser um número inteiro"),
    quantity: Yup.number()
        .required("Obrigatório")
        .min(0, "Número precisa ser positivo")
        .integer("Precisa ser um número inteiro")
        .typeError("É necessário ser um número"),
    category: Yup.string()
        .optional(),

    peso: Yup.number()
        .required("Obrigatório")        
        .min(0.3, "Peso mínimo de 0.3kg")
        .max(30, "Peso máximo de  30kg")
        .typeError("É necessário ser um número"),
    comprimento: Yup.number()
        .required("Obrigatório")
        .min(16, "O comprimento mínimo é de 16cm")
        .max(105, "O comprimento máximo é de 105cm")
        .typeError("É necessário ser um número"),
    altura: Yup.number()
        .required("Obrigatório")
        .min(2, "A altura mínima é de 2cm")
        .max(105, "A altura máxima é de 105cm")
        .typeError("É necessário ser um número"),
    largura: Yup.number()
        .required("Obrigatório")
        .min(11, "A altura mínima é de 11cm")
        .max(105, "A altura máxima é de 105cm")
        .typeError("É necessário ser um número"),
    diametro: Yup.number()
        .required("Obrigatório")
        .min(5, "O diâmetro mínimo é de 5cm")
        .max(91, "O diâmetro máximo é de 91cm")
        .typeError("É necessário ser um número"),
});

interface CategoriesProps
{
    id: number;
    category: string;
}

interface BackupDataProps
{
    category: string;
    formato: string;
    name: string;
    conditions: string;
    price: string;
    quantity: string;
    peso: string;
    comprimento: string;
    altura: string;
    largura: string;
    diametro: string;
}

const RegisterProduct = () => 
{
    const [selectedFIle, setSelectedFile] = useState<File>(); //Guardar o arquivo da imagem
    const [categories, setCategories] = useState<CategoriesProps[]>();  // Salvar as categorias existentes
    const [formatoValue, setFormatoValue] = useState<string>("1");  // Salvar o valor do select de formato
    const [categoryValue, setCategoryValue] = useState<string>(""); // Salvar o valor do select de categorias
    const [notAuthorized, setNotAuthorized] = useState<number>(0);    // Diz se o usuário não é autorizado
    const [backupData, setBackupData] = useState<BackupDataProps>();    // Backup do FormData pra caso haja erro de autorização
    const history = useHistory();   // Usado para possibilitar o redirecionamento
    const [situation, setSituation] = useState<string>("hide"); // Usado para mostrar o modal de produto criado

    // Carrega as categorias, para que sejam colocadas no select de categorias
    useEffect(() => {
        api.get('category')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                alert("Erro ao carregar as categorias existentes");
            })
    }, [])

    // Se houver algum problema de autorização, tenta pedir um novo token e fazer nova requisição. Se der problema, dá um aviso pro admin relogar ou entrar em contato
    useEffect(() => {
        if(notAuthorized === 1)
        {
            api.post('token', {token: localStorage.getItem('@EB:refreshToken')})
                .then(response => {
                    api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                    localStorage.setItem('@EB:accessToken', response.data.accessToken);
                    
                    if(backupData !== undefined)
                    {
                        let {
                            category,
                            formato,
                            name,
                            conditions,
                            price,
                            quantity,
                            peso,
                            comprimento,
                            altura,
                            largura,
                            diametro,
                        } = backupData;

                        if(categoryValue === "nova")
                        {
                            api.post('category', {category})
                                .then(res => {
                                    console.log("Categoria criada", res)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                        else
                            category = categoryValue;

                        // Salva os dados em data
                        const data = new FormData();
                
                        data.append('category', category);
                        data.append('formato', formato);
                        data.append('name', name);
                        data.append('conditions', conditions);
                        data.append('price', price);
                        data.append('quantity', quantity);
                        data.append('peso', peso);
                        data.append('comprimento',comprimento);
                        data.append('altura', altura);
                        data.append('largura', largura);
                        data.append('diametro', diametro);

                        if(selectedFIle)
                            data.append('images', selectedFIle);

                        api.post('products', data)
                        .then(res => {
                            const id = res.data.product_id
                            setSituation("ok");
                            setTimeout(() => {
                            setSituation("hide");
                            history.push('/products/'+id)
                            }, 1000)
                        })
                        .catch(err => {
                            alert("Erro ao criar o produto, relogue e tente novamente. Caso o erro persista, contate o desenvolvedor")
                            console.log(err)
                        })
                    }
                })
                .catch(err => {
                    alert("Token inválido")
                    console.log(err)
                })
        }

    }, [notAuthorized])

    // Mostra o modal de sucesso
    function handleRegister()
    {
        return(
            <div id="modal" className={situation}>
                <div className="content">
                    <div className="header">
                        <img src={check} alt="Cadastro concluído"></img>
                        <h1>Produto cadastrado com sucesso</h1>
                    </div>
                </div>
            </div>
        );
    }

    // Tenta criar o produto com o POST para a API. Se não der certo, diz que o usuário não é autorizado e no useEffect tenta fazer novo post com novo token
    const handleSubmit = (values: FormValues): void =>
    {
        let category = ""
        if(categoryValue === "nova")
        {
            category = values.category;
            api.post('category', {category})
                .then(res => {
                    console.log("Categoria criada", res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else
            category = categoryValue;

        const {
            name,
            conditions,
            price,
            quantity,
            peso,
            comprimento,
            altura, 
            largura,
            diametro
        } = values;

        // Salva os dados em data
        const data = new FormData();

        data.append('category', category);
        data.append('formato', formatoValue);
        data.append('name', name);
        data.append('conditions', String(conditions));
        data.append('price', String(price));
        data.append('quantity', String(quantity));
        data.append('peso', String(peso));
        data.append('comprimento',String(comprimento));
        data.append('altura', String(altura));
        data.append('largura', String(largura));
        data.append('diametro', String(diametro));

        setBackupData({category: values.category, formato:formatoValue, name, conditions:String(conditions), price: String(price), quantity: String(quantity), peso: String(peso), comprimento: String(comprimento), altura: String(altura), largura: String(largura), diametro: String(diametro)})

        if(selectedFIle)
            data.append('images', selectedFIle);
        
        api.post('products', data)
            .then(res => {
                const id = res.data.product_id
                setSituation("ok");
                setTimeout(() => {
                  setSituation("hide");
                  history.push('/products/'+id)
                }, 1000)
            })
            .catch(err => {
                setNotAuthorized(1)
                console.log(err)
            })
    }

    // Muda os valores do select de categorias
    function handleCategorySelectChange(event: ChangeEvent<HTMLSelectElement>) 
    {
        const { value } = event.target;        
        setCategoryValue(value);
    }

    // Muda os valores do select de formato
    function handleFormatSelectChange(event: ChangeEvent<HTMLSelectElement>) 
    {
        const { value } = event.target;        
        setFormatoValue(value);
    }

    // Input de categoria. Só é liberado se o Select de categoria tiver o valor de Nova categoria
    function categoryInput()
    {
        if(categoryValue === "nova")
            return <FormikField name="category" label="Categoria" required={true}/>
        else
            return <FormikField name="category" label="Categoria" disabled={true}/>
    }

    return(
        <div id="page-register-product">
            <Header />
            <div className="content">
                <div className="register-form">
                    <h1>Cadastro de produtos</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={CheckoutSchema}
                    >
                        {() => {
                            return (
                                <div>
                                    <Form className="form">
                                        <div className="main-info">
                                            <h3>Dados principais</h3>
                                            <div className="field-group">
                                                <FormikField name="name" label="Nome do produto"/>
                                                <FormikField name="quantity" label="Quantidade"/>
                                            </div>
                                            <div className="field-group">
                                                <FormikField name="price" label="Preço"/>
                                                <FormikField name="conditions" label="Parcelas"/>
                                            </div>
                                            <div className="field-group">
                                                <div className="select-field">
                                                    <p>Categoria</p>
                                                    <select name="category" id="category" defaultValue="" placeholder="Categoria" required onChange={handleCategorySelectChange}>
                                                        <option value="" data-default disabled>Selecione uma categoria</option>
                                                        <option value="nova">Nova categoria</option>
                                                        {categories?.map(category => {
                                                            return(
                                                                <option key={category.id}value={category.category}>{category.category.replace(/\w/, (c:string) => c.toUpperCase())}</option>
                                                                )
                                                            })}
                                                    </select>
                                                </div>
                                                {categoryInput()}
                                            </div>
                                        </div>

                                        <div className="image">
                                            <Dropzone onFileUploaded={setSelectedFile} />
                                        </div>

                                        <div className="freight-info">
                                            <h3>Dados para cálculo do frete</h3>
                                            <div className="field-group">
                                                <FormikField name="peso" label="Peso"/>
                                                <div className="select-field">
                                                    <p>Formato</p>
                                                    <select name="formato" id="formato" placeholder="Formato" required onChange={handleFormatSelectChange}>
                                                        <option value="1">Caixa</option>
                                                        <option value="2">Rolo</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="field-group">
                                                <FormikField name="comprimento" label="Comprimento"/>
                                                <FormikField name="altura" label="Altura"/>
                                            </div>
                                            <div className="field-group">
                                                <FormikField name="largura" label="Largura"/>
                                                <FormikField name="diametro" label="Diâmetro"/>
                                            </div>
                                        </div>

                                        <div className="confirm">
                                            <button className="confirm" type="submit">Confirmar</button>
                                        </div>
                                    </Form>
                                </div>
                            );
                        }}
                    </Formik>
                </div>
            </div>
            <Footer />
            {handleRegister()}
        </div>
    );
};

export default RegisterProduct;