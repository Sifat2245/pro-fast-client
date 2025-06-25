import React from 'react';
import logo from '../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <div className='flex items-center'>
            <img className='mb-6' src= {logo} alt="" />
            <p className='text-3xl -ml-3 font-extrabold'>ProFast</p>
        </div>
    );
};

export default ProFastLogo;