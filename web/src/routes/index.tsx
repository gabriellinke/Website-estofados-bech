import React from 'react';

import { useAuth } from '../contexts/auth'

import AuthRoutes from './auth.routes';
import UserRoutes from './user.routes';
import AdminRoutes from './admin.routes'

const Routes = () => {
    const { signed, user } = useAuth();

    if(!signed)
        return <AuthRoutes />;
    else
    {    
        if(!user?.admin)
            return <UserRoutes />;
        else
            return <AdminRoutes />;
    }
};

export default Routes;
