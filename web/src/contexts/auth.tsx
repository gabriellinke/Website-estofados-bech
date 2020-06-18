import React, { createContext, useState, useEffect, useContext } from 'react';
import { SignIn } from '../services/auth'
import api from '../services/api'

interface User{
    name: string;
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
    signIn(email: string, password:string): void;    //Daqui vai vir o token e daqui vou pegar os dados do usuário
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider:React.FC = ({ children }) =>  {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        function loadStoragedData() { //No React Native era necessário essa função, mas aqui poderia ser fora, já q n tem async
            const storagedUSer = localStorage.getItem('@EB:user');
            const storagedToken = localStorage.getItem('@EB:token');

            // usar o token tbm
            if(storagedToken && storagedUSer) {
                // Agora quando estou logado, ele automáticamente vai mandar um token pra API nesse header
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

                setUser(JSON.parse(storagedUSer));
            }
        }

        loadStoragedData();
    }, []);

    async function signIn(email: string, password:string){
        const response:Response = await SignIn(email, password);

        setUser(response.user);

        // Agora quando estou logado, ele automáticamente vai mandar um token pra API nesse header. 
        // Não vou precisar adicionar o token manualmente a API
        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        localStorage.setItem('@EB:user', JSON.stringify(response.user));
        localStorage.setItem('@EB:token', response.token);
    }

    function signOut(){
        localStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{signed: Boolean(user), user, signIn, signOut}}>
            { children }
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}