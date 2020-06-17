import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';

import Checkout from '../pages/Checkout';
import Home from '../pages/Home'
import Product from '../pages/Product'

// Renderiza algum dos arquivos, dependendo de qual foi a rota acessada
const UserRoutes = () => 
{
    return(
        <BrowserRouter>
            <Route component={Checkout} path="/buying" exact/>
        </BrowserRouter>
    );
}

export default UserRoutes;