import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Checkout from '../pages/Checkout';
import CheckoutConfirm from '../pages/CheckoutConfirm';
import Home from '../pages/Home'
import Product from '../pages/Product'
import AccountMenu from '../pages/AccountMenu'
import Cart from '../pages/Cart'
import Search from '../pages/Search'
import Category from '../pages/Category'
import ResetPassword from '../pages/ResetPassword'
import CheckoutOk from '../pages/CheckoutOk'
import CheckoutPending from '../pages/CheckoutPending'
import CheckoutError from '../pages/CheckoutError'
import About from '../pages/About'
import Contact from '../pages/Contact'

// Renderiza algum dos arquivos, dependendo de qual foi a rota acessada
const UserRoutes = () => 
{
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Checkout} path="/buying" exact/>
                <Route component={CheckoutConfirm} path="/buying/confirm" exact/>
                <Route component={CheckoutOk} path="/buying/success" exact/>
                <Route component={CheckoutPending} path="/buying/pending" exact/>
                <Route component={CheckoutError} path="/buying/error" exact/>
                <Route component={Search} path="/search/:search" exact/>
                <Route component={Category} path="/category/:category" exact/>
                <Route component={Cart} path="/user/cart" exact/>
                <Route component={AccountMenu} path="/user/menu" exact/>
                <Route component={Home} path="/" exact/>
                <Route component={Product} path="/products/:id" exact/>
                <Route component={ResetPassword} path="/user/reset_password/:token" exact/>
                <Route component={Contact} path="/contato" exact/>
                <Route component={About} path="/about" exact/>
                <Route component={Home} />  {/* Usa o switch para essa rota com a home ser a rota default caso não encontre nenhuma */}
            </Switch>
        </BrowserRouter>
    );
}

export default UserRoutes;