import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Checkout from '../pages/Checkout';
import Home from '../pages/Home';
import Product from '../pages/Product';
import RegisterProduct from '../pages/RegisterProduct'
import Cart from '../pages/Cart'
import Search from '../pages/Search'
import Category from '../pages/Category'

// Renderiza algum dos arquivos, dependendo de qual foi a rota acessada
const AdminRoutes = () => 
{
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Checkout} path="/buying" exact/>
                <Route component={Cart} path="/user/cart" exact/>
                <Route component={Search} path="/search" exact/>
                <Route component={Category} path="/category/:category" exact/>
                <Route component={Home} path="/" exact/>
                <Route component={Product} path="/products/:id" exact/>
                <Route component={RegisterProduct} path="/register" exact/>
                <Route component={Home} />  {/* Usa o switch para que essa rota com a home seja a rota default caso não encontre nenhuma */}
            </Switch>
        </BrowserRouter>
    );
}

export default AdminRoutes;