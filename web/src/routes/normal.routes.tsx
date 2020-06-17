import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';

import Home from '../pages/Home'
import Product from '../pages/Product'

// Renderiza algum dos arquivos, dependendo de qual foi a rota acessada
const NormalRoutes = () => 
{
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={Product} path="/products/:id" exact/>
        </BrowserRouter>
    );
}

export default NormalRoutes;