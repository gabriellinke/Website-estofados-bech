import React, { useEffect, useState, ChangeEvent, FormEvent} from 'react'; //Importa eventos, useState que vai servir para armazenar informações dentro do componente e useEffect que executa uma função quando algo acontece
import { Link, useHistory } from 'react-router-dom';    //Usa o 'Link to' no lugar do 'a href' e useHistory: gives you access to the history instance that you may use to navigate.
import { FiArrowLeft } from 'react-icons/fi';   //Usa react-icons para importar um ícone
// import { Map, TileLayer, Marker} from 'react-leaflet';  //Usado para o mapa
// import { LeafletMouseEvent } from 'leaflet' //Usado para o mapa
import api from '../../services/api';   //Usado para as rotas
import axios from 'axios';  //Usado para rotas
// import Dropzone from '../../components/dropzone'


import { useAuth } from '../../contexts/auth'


import './styles.css';  //Importa o css


const CreatePoint = () =>
{
    const history = useHistory(); 

    interface Item {
        id: number;
        title: string;
        image_url: string;
    }

    interface IBGEUFResponse
    {
        sigla: string;
    }

    interface IBGECityResponse
    {
        nome: string;
    }

// States para armazenar informações dentro desse componente (Create point)

// Array ou objeto: manualmente informar o tipo da variável
    const [items, setItems] = useState<Item[]>([]); //Itens que estão disponíveis para escolha
    const [ufs, setUfs] = useState<string[]>([]);   //UFs disponibilizadas pelo IBGE
    const [cities, setCities] = useState<string[]>([]); //Lista de cidades da UF

    // Dados do usuário que vão vir do fieldset de Dados
    const [formData, setFormData] = useState({ 
        name: '',
        email: '',
        whatsapp: '',
    })

    const [selectedUf, setSelectedUf] = useState('0');  //UF do select
    const [selectedCity, setSelectedCity] = useState('0');  //Cidade do select
    const [selectedItems, setSelectedItems] = useState<number[]>([]);  //Itens que estão selecionados

    // O colchete diz quando que a função que ta dentro do useEffect vai ser disparada. Entretanto, se deixar vazio, vai ser executada assim que 
    // componente for exibido em tela, e apenas uma única vez
   
    // Pega os itens da listagem de itens que tem na rota /items
    useEffect(() => {
        api.get('items')
            .then(response => {
                setItems(response.data);
            });
    }, [])

    // Array ou objeto: manualmente informar o tipo da variável 
    // Consulta a base do IBGE para ter uma lista de estados e salva esses dados no state ufs
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const UFinitials = response.data.map(uf => uf.sigla)

                setUfs(UFinitials);
            })
    }, []);

    // Quando o state selectedUf é mudado, é atualizada a lista de cidades com o novo estado
    useEffect(() => {
        if(selectedUf === '0')
            return;
        
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome)

            setCities(cityNames);
        })

    }, [selectedUf])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){ //Evento de mudança do Select do HTML
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){ //Evento de mudança do Select do HTML
        const city = event.target.value;

        setSelectedCity(city);  
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) //Evento de mudança do Input do HTML
    {
        const { name, value } = event.target;

        // Por exemplo, vai vir uma alteração em email, com o valor X. Aí assim você mantem o que tinha em Data
        // E na variável de name email é botado o value X 
        setFormData({ ...formData, [name]: value }) 
    }

    function handleSelectItem(id: number)
    {
        const alreadySelected = selectedItems.findIndex(item => item === id)    //Vê se o item já está selecionado

        if(alreadySelected >= 0) //Está selecionado, cria um vetor filtrado. Tira o item que está selecionado e foi clicado da lista de selecionados
        {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        }
        else
        {
            setSelectedItems([ ...selectedItems, id ]) //Inclui um novo item selecionado, sem alterar os outros
        }
    }

    async function handleSubmit(event: FormEvent)
    {
        event.preventDefault(); //Faz que a página não seja atualizada automaticamente ao enviar o formulário

        // Pega os dados dos inputs
        const {name, email, whatsapp} = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = [0,0];
        const items = selectedItems;

        // Salva os dados em data
        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude',String(longitude));
        data.append('items', items.join(','));

        // Manda os dados para a rota /points, que serve para criar um novo ponto de coleta
        await api.post('points', data);

        alert('Ponto criado');  //Dá um alerta que o ponto foi criado. Pode ser mudado para uma página mais bonita
        history.push('/');  //Volta para a home
    }

    const { signOut } = useAuth();
    function handleLogOut(){
        signOut();
    }


    return(
        <div id="page-create-point">
            <header>
                <img src="" alt="Ecoleta"/>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para a home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select 
                                name="uf" 
                                id="uf" 
                                value={selectedUf} //O valor do select começa sendo 0 e é atualizada para a UF através do onChange
                                onChange={handleSelectUf}   //Atualiza a selectedUf
                            >
                                {/* Atualiza as options com as UFs que vieram do IBGE */}
                                <option value="0">Selecione um estado</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option> //Seta por ex, Santa Catarina com o value SC. Usa SC como key também
                                ))}
                            </select>
                        </div>

                        {/* A lista de cidades é atualizada quando é trocada a UF. Isso ocorre com a ajuda de um useEffect() */}
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city" 
                                id="city"   
                                value={selectedCity}    //Começa 0 e é atualizado pelo onChange
                                onChange={handleSelectCity} //Atualiza a selectedCity
                            >
                                {/* Atualiza as options com as cidades do estado selecionado */}
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                    {/* The map() method calls the provided function once for each element in an array, in order. */}
                        {items.map(item => (
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)}
                                className={ selectedItems.includes(item.id) ? 'selected' : ''} //A classe é selected se está na lista de selecionados e vazia se não estiver
                            >
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>

                <button onClick={handleLogOut}>
                    Logout
                </button>
            </form>
        </div>
    );
};

export default CreatePoint;