import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';

const RiderRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth()
    const {role, roleLoading} = useUserRole()

    if(loading || roleLoading){
        return <span className='loading loading-spinner loading-xl'></span>
    }

    if(!user || role === 'rider'){
        <Navigate state={location.pathname} to={'/forbidden'}></Navigate>
    }

    return children;
};

export default RiderRoute;