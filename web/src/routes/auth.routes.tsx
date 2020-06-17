import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';

import CreatePoint from '../pages/CreatePoint'

// Renderiza algum dos arquivos, dependendo de qual foi a rota acessada
const AuthRoutes = () => 
{
    return(
        <BrowserRouter>
            <Route component={CreatePoint} path="/create" exact/>
        </BrowserRouter>
    );
}

export default AuthRoutes;