import React, { createContext, useState, useEffect, useContext } from 'react';
import { SignIn } from '../services/auth'
import api from '../services/api'

interface User{
    id: number;
    name: string;
    surname: string;
    email: string;
    admin: boolean;
}

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

interface AuthContextData{
    signed: boolean;
    user: User | null;
    signIn(email: string, password:string): Promise<Boolean>;    //Daqui vai vir o token e daqui vou pegar os dados do usuário
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider:React.FC = ({ children }) =>  {

    const [user, setUser] = useState<User | null>(null);

    // Quando atualiza a página ele verifica no localStorage se tinha algum usuário logado pra continuar a conexão
    useEffect(() => {
            const storagedUSer = localStorage.getItem('@EB:user');
            const storagedToken = localStorage.getItem('@EB:token');

            // usar o token tbm
            if(storagedToken && storagedUSer) {
                // Agora quando estou logado, ele automáticamente vai mandar um token pra API nesse header
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

                setUser(JSON.parse(storagedUSer));
            }

    }, []);

    // Com a ajuda do Auth Service verifica na API se o usuário e senha estão cadastrados e loga o usuário se a resposta for positiva
    async function signIn(email: string, password:string): Promise<Boolean>{
        const response:Response = await SignIn(email, password);

        setUser(response.user);
        // Agora quando estou logado, ele automáticamente vai mandar um token pra API nesse header. 
        // Não vou precisar adicionar o token manualmente a API
        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        localStorage.setItem('@EB:user', JSON.stringify(response.user));
        localStorage.setItem('@EB:token', response.token);

        return (response.token != null);
    }

    // Desloga o usuário limpando o localStorage e setando o usuário como null
    function signOut(){
        localStorage.clear();
        setUser(null);
    }

    // O contexto dá esses values para as rotas. No caso todas rotas recebem esse contexto, devido a configuração do App.tsx
    return (
        <AuthContext.Provider value={{signed: Boolean(user), user, signIn, signOut}}>
            { children }
        </AuthContext.Provider>
    );
};

// Exporta essa função para facilitar o uso, não precisando importar o useContext nas outras partes do projeto
export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}