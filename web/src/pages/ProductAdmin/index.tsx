import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react'; 
import { MdAddShoppingCart, MdAddAPhoto } from 'react-icons/md';
import { GrChapterAdd } from 'react-icons/gr'
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import * as Yup from "yup";
import { Formik, Form, FormikValues } from "formik";
import FormikField from "../../components/FormikField";
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import load from '../../assets/load2.gif';
import { useAuth } from '../../contexts/auth'
import { useHistory } from "react-router-dom";
import Dropzone from '../../components/Dropzone'

import './styles.css';  //Importa o css

interface FormValues {
    name: string;
    price: number;
    conditions: number;
    quantity: number;
};

interface DescriptionFormValues {
    description: string;
}

// Valores iniciais dos inputs
let initialValues: FormValues = {
    name: "",
    price: 0.00,
    conditions: 0,
    quantity: 0,
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
});

// Esquema de validação dos inputs
const DescriptionSchema = Yup.object().shape({
    description: Yup.string()
        .required("Obrigatório")
});

const Product = () =>
{
    const { user } = useAuth();
    const history = useHistory();

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

    interface descriptionProps{
        id: number;
        description:string;
        product_id: number;
    }

    const [product, setProduct] = useState<ProductProps>(); //Guardar a lista de produtos
    const [imagesUrl, setImagesUrl] = useState<string[]>([]); //Vetor que guarda as imagens secundárias
    const [mainImage, setMainImage] = useState<string>(""); //Vetor que guarda a imagem principal
    const [imageToDelete, setImageToDelete] = useState<string>('');   // Imagem que deve ser deletada
    const [savedDescription, setSavedDescription] = useState<string>('');   // Imagem que deve ser deletada
    const [descriptionToDelete, setDescriptionToDelete] = useState<string>('');   // Descrição que deve ser deletada
    const [modifyingProduct, setModifyingProduct] = useState<boolean>(false);   // Form para modificar o produto
    const [deletingProduct, setDeletingProduct] = useState<boolean>(false);   // Mostra o modal de deletar o produto
    const [addingPhoto, setAddingPhoto] = useState<boolean>(false);   // Abre a dropzone para adicionar foto
    const [savedModified, setSavedModified] = useState<FormikValues>();   // Salva os dados que foram modificados no produto, para casos com problema de autenticação
    const [selectedFIle, setSelectedFile] = useState<File>(); //Guardar o arquivo da imagem
    
    const [descriptions, setDescriptions] = useState<descriptionProps[]>([]); //Armazena as descrições do produto
    const [options, setOptions] = useState<number[]>([]); // Armazena a quantidade de options disponíveis
    const [quantity, setQuantity] = useState<number>(1); // Armazena a quantidade de produtos que vão ser adicionados ao carrinho
    const [loadingCart, setLoadingCart] = useState<boolean>(false);   // Loading do adicionar ao carrinho
    const [notAuthorized, setNotAuthorized] = useState<string>('');    // Diz se o usuário não é autorizado

    // Vê qual é o produto da URL e seta as imagens de acordo com o produto
    let { id } = useParams();
    useEffect(() => {
        api.get('products/'+ id) //id
            .then(response => {
                setProduct(response.data);
                if(response.data.images.indexOf(",") > 0)
                {
                    setImagesUrl(response.data.images.split(","));  //Separa a string num vetor de imagens
                    setMainImage(response.data.images.substring(0, response.data.images.indexOf(","))); //Seta a main image como a primeira imagem da string
                }
                else    //Se tiver apenas uma imagem
                {
                    setImagesUrl(response.data.images.split(","));  //Transforma em vetor de imagens. Como n vai ter vírgula, é um vetor de 1 posição
                    setMainImage(response.data.images); //Seta a main image
                }
            });
    }, [id]);

    // Carrega as descrições do produto
    useEffect(() => {
        api.get('descriptions/'+ id)
            .then(response => {
                setDescriptions(response.data);
            })
    }, [id])

    // Disponibiliza a quantidade de unidades que podem ser compradas do produto
    useEffect(() => {
        var vetor = [];
        for(var i = 1; i <= Number(product?.quantity); i++)
        {
            vetor[i] = i;
        }
        setOptions(vetor);
        // Valores iniciais dos inputs
        initialValues = {
            name: String(product?.name),
            price: Number(product?.price),
            conditions: Number(product?.conditions),
            quantity: Number(product?.quantity),
        };
    }, [product])

    // Atualiza o token e faz novas requisições
    useEffect(() => {
        if(notAuthorized !== "")
        {
            api.post('token', {token: localStorage.getItem('@EB:refreshToken')})
                .then(response => {
                    api.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                    localStorage.setItem('@EB:accessToken', response.data.accessToken);

                    if(notAuthorized === 'image')
                        deleteImageSecond();
                    else if(notAuthorized === 'description')
                        deleteDescriptionSecond();
                    else if(notAuthorized === 'modify')
                    {
                        api.post('products/modify', {id: product?.id, name: savedModified?.name, price: savedModified?.price, conditions: savedModified?.conditions, quantity: savedModified?.quantity})
                        .then(response => {
                            setProduct(response.data.product);
                            setNotAuthorized('');
                        })
                        .catch(err => {
                            console.log(err);                
                            alert("Problema de autorização, tente relogar. Se o problema persistir, contate o desenvolvedor");
                        })
                    }
                    else if(notAuthorized === 'addPhoto')
                    {
                        const data = new FormData();
                        if(selectedFIle)
                            data.append('images', selectedFIle);
                
                        api.post('image/'+product?.id, data)
                            .then(response => {
                                if(response.data.images.indexOf(",") > 0)
                                {
                                    setImagesUrl(response.data.images.split(","));  //Separa a string num vetor de imagens
                                    setMainImage(response.data.images.substring(0, response.data.images.indexOf(","))); //Seta a main image como a primeira imagem da string
                                }
                                else    //Se tiver apenas uma imagem
                                {
                                    setImagesUrl(response.data.images.split(","));  //Transforma em vetor de imagens. Como n vai ter vírgula, é um vetor de 1 posição
                                    setMainImage(response.data.images); //Seta a main image
                                }
                                setAddingPhoto(false);
                            })
                            .catch(err => {
                                console.log(err);
                                alert("Problema de autorização, tente relogar. Se o problema persistir, contate o desenvolvedor");
                                setAddingPhoto(false);
                            })
                    }
                    else if(notAuthorized === 'addDescription')
                    {
                        api.post('description', {product_id: product?.id, description: savedDescription})
                            .then(response => {
                                let newDescription:descriptionProps = {
                                    id: parseInt(response.data.description_id),
                                    description: response.data.description,
                                    product_id: parseInt(response.data.product_id)
                                }
                                setDescriptions([...descriptions, newDescription])
                                setSavedDescription('');
                            })
                            .catch(err => {
                                console.log(err)
                                alert("Problema de autorização, tente relogar. Se o problema persistir, contate o desenvolvedor");
                                setSavedDescription('');
                            })
                    }
                    else if(notAuthorized === 'deleteProduct')
                    {
                        api.post('products/delete', {id: product?.id})
                        .then(response => {
                            if(response.data.removedProduct > 0)
                            {
                                setDeletingProduct(false);
                                alert("Produto removido")
                                history.push('/');
                            }
                            
                            setDeletingProduct(false);
                        })
                        .catch(err => {
                            setDeletingProduct(false);
                            console.log(err);
                            alert("Problema de autorização, tente relogar. Se o problema persistir, contate o desenvolvedor");
                        })
                    }
                }) 
                .catch(err => {
                    alert("Token inválido")
                    console.log(err)
                })
        }
    }, [notAuthorized])

    // Muda a main image quando a secondary-image for clicada
    function handleImageClick(image:string)
    {
        setMainImage(image);
    }

    // Altera a quantity quando há alguma mudança no select
    function handleQuantitySelectChange(event: ChangeEvent<HTMLSelectElement>) 
    {
        const { value } = event.target;
        setQuantity(parseInt(value));
        console.log(value)
    }

    // Faz a requisição para a API para adicionar o produto ao carrinho do usuário
    function addToCart()
    {
        setLoadingCart(true)
        api.post('/user/cart/add', {product_id: product?.id, user_id: user?.id, quantity: quantity})
            .then(response => {
                setLoadingCart(false);
                console.log(response.data);
                history.push('/user/cart')
            })
            .catch(err =>{
                console.log(err);
                setLoadingCart(false);
            })
    }

    // Mostra o botão do carrinho e mostra a animação de carregamento
    function buttonCart()
    {
        if(!loadingCart)
            return(
                <div className="add">
                    <MdAddShoppingCart size="50"/>
                    <div className="add-text">Adicionar ao carrinho</div>
                </div>
            );
        else
            return(
                <div className="add">
                    <img src={load} alt="Carregando" width="50" height="50"/>
                    <div className="add-text">Adicionar ao carrinho</div>
                </div>
            );
    }

    // Função para deletar a imagem
    function deleteImage()
    {
        api.post('remove/image', {product_id: product?.id, image: imageToDelete})
            .then(response => {
                if(response.data.img.indexOf(",") > 0)
                {
                    setImagesUrl(response.data.img.split(","));  //Separa a string num vetor de imagens
                    setMainImage(response.data.img.substring(0, response.data.img.indexOf(","))); //Seta a main image como a primeira imagem da string
                }
                else    //Se tiver apenas uma imagem
                {
                    setImagesUrl(response.data.img.split(","));  //Transforma em vetor de imagens. Como n vai ter vírgula, é um vetor de 1 posição
                    setMainImage(response.data.img); //Seta a main image
                }

                if(response.data.changedProduct > 0)
                {
                    setImageToDelete('');
                    setNotAuthorized('');
                }
            })
            .catch(err => {
                console.log(err);
                setNotAuthorized('image');
            })
    }

    // Função chamada caso dê um problema na autorização para deletar a imagem
    function deleteImageSecond()
    {
        api.post('remove/image', {product_id: product?.id, image: imageToDelete})
            .then(response => {
                if(response.data.images.indexOf(",") > 0)
                {
                    setImagesUrl(response.data.img.split(","));  //Separa a string num vetor de imagens
                    setMainImage(response.data.img.substring(0, response.data.img.indexOf(","))); //Seta a main image como a primeira imagem da string
                }
                else    //Se tiver apenas uma imagem
                {
                    setImagesUrl(response.data.img.split(","));  //Transforma em vetor de imagens. Como n vai ter vírgula, é um vetor de 1 posição
                    setMainImage(response.data.img); //Seta a main image
                }

                if(response.data.changedProduct > 0)
                {
                    setImageToDelete('');
                    setNotAuthorized('');
                }
            })
            .catch(err => {
                console.log(err);
                alert("Problema de autorização, tente relogar. Se o problema persistir, contate o desenvolvedor");
            })
    }

    // Mostra o modal para deletar a imagem
    function modalDeleteImage()
    {
        if(imageToDelete !== "")
            return(
                <div id="modal" className='image-modal'>
                    <div className="content">
                        <div className="header">
                            <h1>Tem certeza que deseja deletar a imagem?</h1>
                            <div className="buttons">
                                <button className="ok" onClick={deleteImage}>Sim</button>
                                <button onClick={() => setImageToDelete('')}>Não</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

    // Função para deletar a descrição
    function deleteDescription()
    {
        console.log(descriptionToDelete)
        api.post('remove/description', {product_id: product?.id, description: descriptionToDelete})
            .then((response) => {
                setDescriptions(descriptions.filter(desc => {
                    return (desc.description !== descriptionToDelete)
                }))

                if(response.data.removedDescription > 0)
                {
                    setDescriptionToDelete('');
                    setNotAuthorized('');
                }
            })
            .catch(err => {
                console.log(err);
                setNotAuthorized('description');
            })
    }

    // Função para deletar a descrição caso haja erro na autorização
    function deleteDescriptionSecond()
    {
        api.post('remove/description', {product_id: product?.id, description: descriptionToDelete})
            .then((response) => {
                setDescriptions(descriptions.filter(desc => {
                    return (desc.description !== descriptionToDelete)
                }))

                if(response.data.removedDescription > 0)
                {
                    setDescriptionToDelete('');
                    setNotAuthorized('');
                }
            })
            .catch(err => {
                console.log(err);
                alert("Problema de autorização, tente relogar. Se o problema persistir, contate o desenvolvedor");
            })
    }

    // Mostra o modal para deletar a descrição
    function modalDeleteDescription()
    {
        if(descriptionToDelete !== "")
            return(
                <div id="modal" className='description-modal'>
                    <div className="content">
                        <div className="header">
                            <h1>Tem certeza que deseja deletar a descrição?</h1>
                            <div className="buttons">
                                <button className="ok" onClick={deleteDescription}>Sim</button>
                                <button onClick={() => setDescriptionToDelete('')}>Não</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

    // Modal para deletar produto
    function modalDeleteProduct()
    {
        if(deletingProduct)
            return(
                <div id="modal" className='delete-modal'>
                    <div className="content">
                        <div className="header">
                            <h1>Tem certeza que deseja excluir o produto?</h1>
                            <div className="buttons">
                                <button className="ok" onClick={deleteProduct}>Sim</button>
                                <button onClick={() => setDeletingProduct(false)}>Não</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

    // Função que deleta o produto
    function deleteProduct()
    {
        api.post('products/delete', {id: product?.id})
            .then(response => {
                if(response.data.removedProduct > 0)
                {
                    setDeletingProduct(false);
                    alert("Produto removido")
                    history.push('/');
                }
                setDeletingProduct(false);
            })
            .catch(err => {
                console.log(err);
                setNotAuthorized('deleteProduct')
            })
    }

    // Ao enviar o formulário de modificação
    const handleSubmit = (values: FormValues): void =>
    {
        setSavedModified(values);
        api.post('products/modify', {id: product?.id, name: values.name, price: values.price, conditions: values.conditions, quantity: values.quantity})
            .then(response => {
                setProduct(response.data.product);
                setNotAuthorized('');
            })
            .catch(err => {
                console.log(err);
                setNotAuthorized('modify');
            })
    }

    // Botão para modificar / Formulário para modificação
    function modifyingForm()
    {
        if(modifyingProduct)
            return(
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={CheckoutSchema}
                >
                    {() => {
                        return (
                            <div>
                                <Form className="form">
                                    <FormikField className="name-field" name="name" label="Nome do produto"/>
                                    <div className="field-group">
                                        <FormikField name="price" label="Preço"/>
                                        <FormikField name="quantity" label="Quantidade"/>
                                        <FormikField name="conditions" label="Parcelas"/>
                                    </div>
                                    <button>Aplicar mudanças</button>
                                </Form>
                                <button className="delete-product" onClick={() => setDeletingProduct(true)}>Excluir produto</button>    
                            </div>
                        );
                    }}
                </Formik>
            );
        else
            return <button className="modify-product" onClick={() => setModifyingProduct(!modifyingProduct)}>Modificar produto</button>
    }

    // Modal com a dropzone para adicionar foto
    function addPhotoDropzone()
    {
        if(addingPhoto)
            return(
                <div id="modal" className='add-photo-modal'>
                    <div className="content">
                        <div className="header">
                            <Dropzone onFileUploaded={setSelectedFile} />
                            <div className="buttons">
                                <button className="ok" onClick={addPhoto}>Adicionar</button>
                                <button onClick={() => setAddingPhoto(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

    // Adiciona a foto ao produto
    function addPhoto()
    {
        const data = new FormData();
        if(selectedFIle)
            data.append('images', selectedFIle);

        api.post('image/'+product?.id, data)
            .then(response => {
                if(response.data.images.indexOf(",") > 0)
                {
                    setImagesUrl(response.data.images.split(","));  //Separa a string num vetor de imagens
                    setMainImage(response.data.images.substring(0, response.data.images.indexOf(","))); //Seta a main image como a primeira imagem da string
                }
                else    //Se tiver apenas uma imagem
                {
                    setImagesUrl(response.data.images.split(","));  //Transforma em vetor de imagens. Como n vai ter vírgula, é um vetor de 1 posição
                    setMainImage(response.data.images); //Seta a main image
                }
                setAddingPhoto(false);
            })
            .catch(err => {
                console.log(err);
                setNotAuthorized('addPhoto')
            })
    }

    // Usado para criar uma nova decrição
    const handleSubmit2 = (values: DescriptionFormValues): void =>
    {
        setSavedDescription(values.description);
        api.post('description', {product_id: product?.id, description: values.description})
            .then(response => {
                let newDescription:descriptionProps = {
                    id: parseInt(response.data.description_id),
                    description: response.data.description,
                    product_id: parseInt(response.data.product_id)
                }
                setDescriptions([...descriptions, newDescription])
                setSavedDescription('');
            })
            .catch(err => {
                console.log(err)
                setNotAuthorized('addDescription');
            })
    }

    // Form para criar descrição
    function descriptionForm()
    {
        return(
            <Formik
                initialValues={{description: ''}}
                onSubmit={handleSubmit2}
                validationSchema={DescriptionSchema}
            >
                {() => {
                    return (
                        <div>
                            <Form className="form">
                                <FormikField className="description-field" name="description" label="Nova descrição"/>
                                <button><GrChapterAdd size="30"/></button>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        );
    }

    // Redireciona o usuário para a página de compra
    function handleCheckout(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        let idProduto;

        if(product !== undefined)
            idProduto = product.id;      
        localStorage.setItem('@EB:id', String(idProduto));
        localStorage.setItem('@EB:quantity', String(quantity));
        try{
            history.push('/buying')
        }
        catch
        {
            history.push('/')
            console.log("Ocorreu um erro no submit do Checkout")
        }
    }

    return(
        <div id="product-info-admin">
            <Header />
            <div className="content">
                <main>
                <h2>{product?.name}</h2>
                    <div className="grid">
                        <div className="image">
                            <div className="main-image">
                                <img src={mainImage} alt="Imagem do produto"/>
                            </div>
                            <div className="secondary-image">
                                {imagesUrl.map(image => {
                                    return(
                                        <div className="delete-image">
                                            <span className="delete" onClick={(() => setImageToDelete(image))}>X</span>
                                            <img src={image}
                                            className={ (mainImage === image) ? 'selected' : ''}
                                            alt="Imagem do produto"
                                            key={image}
                                            id={image}
                                            onClick={() => handleImageClick(image)}/>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="add-photo">
                                <MdAddAPhoto size='40' onClick={() => setAddingPhoto(true)} className='icon'/>
                            </div>
                        </div>
                        <div className="buy">
                            <form action="/buying" method="GET" id="form1" onSubmit={handleCheckout}>
                                <p className="price-area">{`R$${Number(product?.price).toFixed(2)}`}</p>
                                <p className="conditions">{`em até ${product?.conditions}x no cartão`}</p>
                                <div className="purchase-area">
                                    <p className="avaiable">{`${product?.quantity} unidades disponíveis`}</p>
                                    <div className="purchase">
                                        <select name="quantity" id="quantity" required placeholder="Quantidade" onChange={handleQuantitySelectChange}>
                                            {options.map(number => {
                                                return <option value={number} key={number}>{number}</option>;
                                            })
                                        }
                                        </select>
                                        <button type="submit">Comprar</button>
                                        <button type="button" onClick={addToCart}>
                                            {buttonCart()}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="modify-product">
                                {modifyingForm()}
                            </div>
                        </div>
                    </div>
                </main>
                <div className="description">
                    <h1>Descrição</h1>
                    <h2>{product?.name}</h2>
                    {descriptions.map((res:any) => {
                        return(
                            <div className="delete-description">
                                <span className="delete" onClick={(() => setDescriptionToDelete(res.description))}>X</span>
                                <p>{res.description}</p>
                            </div>
                        );
                    })}
                    <div className="add-description">
                        {descriptionForm()}
                    </div>
                </div>              
            </div>
            <Footer />
            {modalDeleteImage()}
            {modalDeleteDescription()}
            {addPhotoDropzone()}
            {modalDeleteProduct()}
        </div>
    );
};

export default Product