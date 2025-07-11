import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/navbar/Navbar';
import Footer from '../Pages/shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;