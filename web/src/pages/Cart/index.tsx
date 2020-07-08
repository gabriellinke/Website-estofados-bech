import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Footer from '../../partials/Footer/Footer';
import Header from '../../partials/Header/Header';
import { useAuth } from '../../contexts/auth'
import api from '../../services/api';
import Ajax from '../../services/ajax'
import { Link, useHistory } from "react-router-dom";
import load from '../../assets/load2.gif';

import './styles.css';  //Importa o css

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

interface QuantityProps{
    product_id: number;
    quantity: number;
}

// Informações para o cálculo do frete
interface FreteInfo{ 
    cdServico: string,
    CepOrigem: number,
    CepDestino: string,
    peso: number,
    formato: number, 
    comprimento: number,
    altura: number,
    largura: number,
    diametro: number,
    cdMaoPropria: string,
    valorDeclarado: number,
    avisoRecebimento: string,
}

const Cart = () => 
{
    const { user } = useAuth(); // Usuário da sessão
    const history = useHistory();
    const [products, setProducts] = useState<ProductProps[]>([]); //Guardar a lista de produtos
    const [productsQuantity, setProductsQuantity] = useState<QuantityProps[]>([]); //Guardar a lista com a quantidade de cada produto
    const [loadingInput, setLoadingInput] = useState<number>(0); //Animação de loading quando adiciona/remove produto. O number é o id do produto
    const [productsPrice, setProductsPrice] = useState<number>(0); //Salva a o preço acumulado dos produtos

    const [idInput, setIdInput] = useState<string>(""); //Animação de loading quando adiciona/remove produto. O number é o id do produto
    const [quantityInput, setQuantityInput] = useState<string>(""); //Animação de loading quando adiciona/remove produto. O number é o id do produto

    // Ao abrir a página faz um request pra API pra pegar os produtos que estão no carrinho do usuário
    useEffect(() => {
        let id = 0;
        if(user?.id)
            id = user.id;

        api.get('user/cart/'+id) 
            .then(response => {
                setProductsQuantity(response.data.quantity);
                setProducts(response.data.products);
            });
    }, [])

    // Atualiza o preço total quando os produtos do carrinho são atualizados. Também atualiza o Input de IDs e de quantidades
    useEffect(() => {
        updateProductsPrice();

        const quantidade = productsQuantity.map(pd => {
            return pd.quantity;
        })
        setQuantityInput(quantidade.join('-'));

        const produto = productsQuantity.map(pd => {
            return pd.product_id;
        })
        setIdInput(produto.join('-'));
    }, [productsQuantity, products])
    
    // Remove um produto do carrinho
    function removeProduct(product_id:number)
    {
        setLoadingInput(product_id);
        api.post('user/cart/remove', {user_id: user?.id, product_id, quantity: -1})
            .then(res => {
                setProducts(products.filter(prod => {
                    return prod.id !== product_id;
                }))
                setProductsQuantity(productsQuantity.filter(prod => {
                    return prod.product_id !== product_id;
                }))
                setLoadingInput(0);
            })
            .catch(err =>{
                console.log(err);
                setLoadingInput(0);
            })
    }

    // Quando é mudado o número do input, é feito um POST para a API pra atualizar o número de produtos do carrinho
    function handleQuantityInputChange(event: ChangeEvent<HTMLInputElement>, product_id:number) 
    {
        const { value } = event.target;        
        setLoadingInput(product_id);
        // Muda a quantidade do produto e seta a quantidade com o novo valor
        api.post('user/cart/change', {user_id: user?.id, product_id, quantity: value})
        .then(res => {
            const filtered = productsQuantity.filter(prod => {
                return prod.product_id !== product_id;
            })
            const product = productsQuantity.filter(prod => {
                return prod.product_id === product_id;
            })
            product[0].quantity = res.data.quantity;

            setProductsQuantity([product[0], ...filtered]);
            setLoadingInput(0);
        })
        .catch(err =>{
            console.log(err);
            setLoadingInput(0);
        })
    }
    
    // Atualiza o preço total dos produtos do carrinho
    function updateProductsPrice()
    {
        const prices = products.map(prod => {
            const quantity = productsQuantity.filter(res => {
                return res.product_id === prod.id;
            })
            return quantity[0].quantity * parseFloat(prod.price); // Preço total
        })
        
        let totalPrice = 0;
        for(let price of prices)
        {
            totalPrice += price;
        }

        setProductsPrice(totalPrice);
    }
    
    // Retorna o input ou o input com a animação de carregamento
    function Input(prod:ProductProps, currentQuantity: number)
    {
        if(loadingInput !== prod.id)
            return(
                <div className="input">
                    <input type="number" className="current-quantity" min={1} max={prod.quantity} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityInputChange(event ,prod.id)} defaultValue={currentQuantity.toString()}/>
                </div>
            );
        else
            return(
                <div className="input">
                    <input disabled type="number" className="current-quantity" min={1} max={prod.quantity} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQuantityInputChange(event ,prod.id)} defaultValue={currentQuantity.toString()}/>
                    <img src={load} alt="Carregando" width="40" height="40"/>
                </div>
            );
    }

    // Redireciona o usuário para a página de compra
    function handleSubmit(event: FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
    
        localStorage.setItem('@EB:id', String(idInput));
        localStorage.setItem('@EB:quantity', String(quantityInput));
        try{
            history.push('/buying')
        }
        catch
        {
            history.push('/')
            console.log("Ocorreu um erro no submit do Checkout")
        }
    }

    // Se o carrinho estiver vazio vai mostrar uma mensagem. Se não estiver, vai mostrar o carrinho
    function showCart()
    {
        if(productsPrice != 0)
        {
            return(
                <main>
                    <h1>Carrinho de compras</h1>
                    <div className="products-grid">
                        {products.map(prod => {
                            let images ="";
                            if(prod.images.indexOf(',') > 0)
                                images = prod.images.substring(0, prod.images.indexOf(','));
                            else
                                images = prod.images.substring(0, prod.images.length);

                            const currentQuantity = productsQuantity.filter(res => {
                                return res.product_id === prod.id;
                            })

                            return(
                                <li key={prod.id} className="cart-product">
                                    <Link to={`/products/${prod.id}`}>
                                        <div className="info">
                                            <img src={images} width={100} height={100} alt={prod.name}/>
                                            <div className="title">{prod.name}</div>
                                        </div>
                                    </Link>
                                    <div className="quantity-price">
                                        <div className="quantity">
                                            {Input(prod, currentQuantity[0].quantity)}
                                        </div>    
                                        <div className="max-quantity-remove-price">
                                            <div className="max-quantity-remove">
                                                <div className="max-quantity">{prod.quantity} disponíveis</div>
                                                <button className="remove" onClick={() => removeProduct(prod.id)}>Excluir</button>
                                            </div>
                                            <div className="price">
                                                <strong>{`R$${(Number(prod.price)*Number(currentQuantity[0].quantity)).toFixed(2)}`}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </div>
                    <div className="freight-area-price">
                        <div className="freight-area">
                            <div className="freight-area-column">
                                <div className="freight-area-row">
                                    <div className="freight-text">Calcular frete e <br /> prazo de entrega</div>
                                        <div className="cep">
                                            <form onSubmit={calcularFrete} id="form2">
                                                <input type="text" placeholder="CEP" name="cep" id="cep" onChange={handleCEPInputChange}/>
                                                <button>OK</button>
                                                {loadingAnimationFrete()}
                                            </form>
                                            <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/">Não sei meu CEP</a>
                                        </div>
                                    </div>
                                {showFrete()}
                            </div>
                        </div>                        
                        <div className="checkout-price">
                            <div className="products-price">
                                <div className="products-price-text">Produtos:</div>
                                <div className="products-price-number">R${productsPrice.toFixed(2)}</div>
                            </div>
                            <div className="freight-price">
                                <div className="freight-price-text">Frete:</div>
                                <div className="freight-price-number">R${valorFrete.toFixed(2)}</div>
                            </div>
                            <div className="total-price">
                                <div className="total-price-text">Total:</div>
                                <div className="total-price-number">R${(productsPrice + valorFrete).toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                    <form action="/buying" method="GET" id="form1" onSubmit={handleSubmit}>
                        <button type="submit">Continuar a compra</button>
                    </form>
                </main>
            );
        }
        else
        {
            return(
                <main>
                    <h1>Carrinho de compras</h1>
                    <div className="empty">
                        <div className="title">
                            O seu carrinho está vazio!
                        </div>
                        <Link to='/'>Continuar comprando</Link>
                    </div>
                </main>
            );
        }
    }

    // Parte referente ao cálculo do frete

    const [cepDestino, setCepDestino] = useState<string>(""); //Vetor que armazena o CEP de destino do produto
    const [freteInfo, setFreteInfo] = useState<string>(""); //Guarda as informações do frete para o CEP que foi consultado
    const [valorFrete, setValorFrete] = useState<number>(0);   //Armazena o valor do frete
    const [prazoFrete, setPrazoFrete] = useState<string>("");   //Armazena o prazo de entrega dos correios
    const [mostrarFrete, setMostrarFrete] = useState<string>("");   //Diz se é preciso mostrar o frete
    const [loadingFrete, setLoadingFrete] = useState<boolean>(false);   //  Loading do frete

    // Precisa configurar para cada tamanho de produto
    const frete:FreteInfo = {
        cdServico: "04510", //SEDEX 04014 -   PAC 04510
        CepOrigem: 89870000,
        CepDestino: cepDestino,
        // peso: (product?.peso !== undefined) ? product.peso : 5,
        // formato: (product?.formato !== undefined) ? product.formato : 1,
        // comprimento: (product?.comprimento !== undefined) ? product.comprimento : 16,
        // altura: (product?.altura !== undefined) ? product.altura : 2,
        // largura: (product?.largura !== undefined) ? product.largura : 11,
        // diametro: (product?.diametro !== undefined) ? product.diametro : 5,
        peso: 2,
        formato: 1,
        comprimento: 16,
        altura: 2,
        largura: 11,
        diametro:  5,
        cdMaoPropria: "N",
        valorDeclarado: 0,
        avisoRecebimento: "N",
    }

    // Quando as informações do frete são atualizadas, armazena o novo valor prazo do frete e mostra o preço e prazo
    useEffect(() => {
        setPrazoFrete(freteInfo.substring(freteInfo.indexOf('<PrazoEntrega>')+14, freteInfo.indexOf('</PrazoEntrega>')));

        if(parseInt(prazoFrete) > 0)
            setMostrarFrete("show")
        else if(parseInt(prazoFrete) === 0)
            setMostrarFrete("error")
    }, [calcularFrete])

    // Muda o CEP de destino quando é escrito algo no input
    function handleCEPInputChange(event: ChangeEvent<HTMLInputElement>) 
    {
        const { value } = event.target;

        setCepDestino(apenasNumeros(value));
    }

    // Retira os caracteres que não forem números do CEP
    function apenasNumeros(string:string) 
    {
        return string.replace(/[^0-9]/g,'');
    }

    // Calcula o frete com os dados informados e mostra o frete
    function calcularFrete(event: FormEvent<HTMLFormElement>)
    {
        setLoadingFrete(true)
        event.preventDefault();
        let ajax = new Ajax();
        ajax.httpGet('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=&sDsSenha=&nCdServico='+frete.cdServico +'&sCepOrigem='+ frete.CepOrigem+'&sCepDestino='+frete.CepDestino+'&nVlPeso='+frete.peso+'&nCdFormato='+frete.formato+'&nVlComprimento='+frete.comprimento+'&nVlAltura='+frete.altura+'&nVlLargura='+frete.largura+'&nVlDiametro='+frete.diametro+'&sCdMaoPropria='+frete.cdMaoPropria+'&nVlValorDeclarado='+frete.valorDeclarado+'&sCdAvisoRecebimento='+frete.avisoRecebimento+'%20HTTP/1.1',
        (status:number, response:string) => {
            setFreteInfo(JSON.stringify(response));
            const freteInfo = (JSON.stringify(response));
            const freight = (freteInfo.substring(freteInfo.indexOf('<Valor>')+7, freteInfo.indexOf('</Valor>')));
            const freightPrice = parseFloat(freight.replace(",", "."));
            setValorFrete(freightPrice)


            setLoadingFrete(false);
        })
    }

    // Mostra animação de carregamento
    function loadingAnimationFrete()
    {
        if(loadingFrete)
        return(
            <img src={load} alt="Carregando" width="52.4" height="52.4"/>
        );
    }

    // Mostra o frete ou a mensagem de erro ao carregar o frete
    function showFrete()
    {
            if(mostrarFrete === "show")
            {
                return(
                    <div className="delivery">
                        <div className="delivery-text">Entrega</div>
                        <div className="delivery-data">
                            <div className="type">Normal</div>
                            <div className="day">{`Entregue em ${prazoFrete} dias`}</div>
                            <div className="cost">{`R$${valorFrete.toFixed(2)}`}</div>
                        </div>
                    </div>
                );
            }
            else if(mostrarFrete === "")
            {
                return(
                    <div></div>
                );
            }
            else
            {
                return(
                    <div className="error-delivery">CEP não encontrado, tente outro!</div>
                );
            }

    }

    return(
        <div id="page-cart">
            <Header />
            <div className="content">
                {showCart()}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;