import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import Product from './pages/Product'

// Renderiza algum dos arquivos, dependendo de qual foi a rota acessada
const Routes = () => 
{
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={Product} path="/products/:id" exact/>
            {/* <Route component={CreatePoint} path="/create-point"/> */}
        </BrowserRouter>
    );
}

export default Routes;