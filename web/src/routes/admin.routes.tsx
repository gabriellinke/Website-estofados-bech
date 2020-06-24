import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Checkout from '../pages/Checkout';
import Home from '../pages/Home';
import Product from '../pages/Product';
import RegisterProduct from '../pages/RegisterProduct'

// Renderiza algum dos arquivos, dependendo de qual foi a rota acessada
const AdminRoutes = () => 
{
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Checkout} path="/buying" exact/>
                <Route component={Home} path="/" exact/>
                <Route component={Product} path="/products/:id" exact/>
                <Route component={RegisterProduct} path="/register" exact/>
                <Route component={Home} />  {/* Usa o switch para que essa rota com a home seja a rota default caso não encontre nenhuma */}
            </Switch>
        </BrowserRouter>
    );
}

export default AdminRoutes;