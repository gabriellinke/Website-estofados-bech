import axios from 'axios';

// Pra acessar a rota. Poderia ser usado um componente da biblioteca padrão, porém não dá pra definir URL base.
// Assim, se for mudada a rota do projeto, é só mudar a URL base, não precisa mudar em todos os lugares em que foi usada alguma rota

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;