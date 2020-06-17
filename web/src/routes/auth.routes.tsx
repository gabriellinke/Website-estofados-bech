import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom';

import Home from '../pages/Home'
import Product from '../pages/Product'
import Login from '../pages/Login'

// Rotas para quem não está autenticado
const AuthRoutes = () => 
{
    return(
        <BrowserRouter>
            <Route component={Login} path="/login" exact/>
            <Route component={Home} path="/" exact/>
            <Route component={Product} path="/products/:id" exact/>
        </BrowserRouter>
    );
}

export default AuthRoutes;