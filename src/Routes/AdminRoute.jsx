import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {role, roleLoading} = useUserRole()
    const location = useLocation()

    if(loading || roleLoading){
        return <span className='loading loading-spinner loading-xl'></span>
    }

    if(!user || role !== 'admin'){
        return <Navigate state={location.pathname} to={'/forbidden'}></Navigate>
    }
    return children
};

export default AdminRoute;