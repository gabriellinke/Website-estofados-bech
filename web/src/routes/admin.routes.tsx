import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Checkout from '../pages/Checkout';
import Home from '../pages/Home';
import ProductAdmin from '../pages/ProductAdmin';
import RegisterProduct from '../pages/RegisterProduct'
import Cart from '../pages/Cart'
import AccountMenu from '../pages/AccountMenu'
import Search from '../pages/Search'
import Category from '../pages/Category'
import ResetPassword from '../pages/ResetPassword'

// Renderiza algum dos arquivos, dependendo de qual foi a rota acessada
const AdminRoutes = () => 
{
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Checkout} path="/buying" exact/>
                <Route component={Cart} path="/user/cart" exact/>
                <Route component={AccountMenu} path="/user/menu" exact/>
                <Route component={Search} path="/search/:search" exact/>
                <Route component={Category} path="/category/:category" exact/>
                <Route component={Home} path="/" exact/>
                <Route component={ProductAdmin} path="/products/:id" exact/>
                <Route component={RegisterProduct} path="/register" exact/>
                <Route component={ResetPassword} path="/user/reset_password/:token" exact/>
                <Route component={Home} />  {/* Usa o switch para que essa rota com a home seja a rota default caso não encontre nenhuma */}
            </Switch>
        </BrowserRouter>
    );
}

export default AdminRoutes;