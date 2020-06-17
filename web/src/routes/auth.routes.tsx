import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/Home'
import Product from '../pages/Product'
import Login from '../pages/Login'

// Rotas para quem não está autenticado
const AuthRoutes = () => 
{
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/login" exact/>
                <Route component={Home} path="/" exact/>
                <Route component={Product} path="/products/:id" exact/>
                <Route component={Home} />  {/* Usa o switch para essa rota com a home ser a rota default caso não encontre nenhuma */}
            </Switch>
        </BrowserRouter>
    );
}

export default AuthRoutes;