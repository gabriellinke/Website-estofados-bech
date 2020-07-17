import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from '../pages/Home'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NewPassword from '../pages/NewPassword'
import ResetPassword from '../pages/ResetPassword'
import Search from '../pages/Search'
import Category from '../pages/Category'
import CheckoutOk from '../pages/CheckoutOk'
import CheckoutPending from '../pages/CheckoutPending'
import CheckoutError from '../pages/CheckoutError'
import About from '../pages/About'
import Contact from '../pages/Contact'

// Rotas para quem não está autenticado
const AuthRoutes = () => 
{
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/user/login" exact/>
                <Route component={Register} path="/user/register" exact/>
                <Route component={Category} path="/category/:category" exact/>
                <Route component={Home} path="/" exact/>
                <Route component={Search} path="/search/:search" exact/>
                <Route component={Product} path="/products/:id" exact/>
                <Route component={NewPassword} path="/user/reset" exact/>
                <Route component={ResetPassword} path="/user/reset_password/:token" exact/>
                <Route component={CheckoutOk} path="/buying/success" exact/>
                <Route component={CheckoutPending} path="/buying/pending" exact/>
                <Route component={CheckoutError} path="/buying/error" exact/>
                <Route component={About} path="/about" exact/>
                <Route component={Contact} path="/contato" exact/>
                <Route component={Home} />  {/* Usa o switch para essa rota com a home ser a rota default caso não encontre nenhuma */}
            </Switch>
        </BrowserRouter>
    );
}

export default AuthRoutes;