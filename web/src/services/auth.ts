import api from "./api";

interface Response {
    accessToken: string;
    refreshToken: string;
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
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user
    });
}
