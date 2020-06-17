import React, { createContext, useState } from 'react';
import { SignIn } from '../services/auth'

interface AuthContextData{
    signed: boolean;
    user: object | null;
    signIn(): Promise<void>;    //Daqui vai vir o token e daqui vou pegar os dados do usuário
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider:React.FC = ({ children }) =>  {

    const [user, setUser] = useState<object | null>(null);

    async function signIn(){
        const response = await SignIn();

        setUser(response.user);
    }

    return (
        <AuthContext.Provider value={{signed: Boolean(user), user, signIn}}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;