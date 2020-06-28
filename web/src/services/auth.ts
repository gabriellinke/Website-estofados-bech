import api from "./api";

interface Response {
    token: string;
    user: {
        id: number;
        name: string;
        surname: string;
        email: string;
        admin: boolean;
    }
}

// Consulta a api para ver se o usuário e senha inseridos são válidos
export async function SignIn(email:string, password:string): Promise<Response> { 
    const response = await api.post('/user/login', {email, password});

    return({
        token: response.data.meuToken,
        user: response.data.userOk
    });
}
