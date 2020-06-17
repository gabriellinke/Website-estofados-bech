import React from 'react';

import { useAuth } from '../contexts/auth'

import AuthRoutes from './auth.routes';
import UserRoutes from './user.routes';

const Routes = () => {
    const { signed } = useAuth();

    return signed? (<UserRoutes />) : <AuthRoutes />;
};

export default Routes;
