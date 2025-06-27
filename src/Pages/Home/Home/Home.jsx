import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../../Components/HowItWorks';
import OurServices from '../../../Components/OurServices';
import Teams from '../../../Components/Teams';

const Home = () => {
    return (
        <>
        <Banner></Banner>
        <HowItWorks></HowItWorks>
        <OurServices></OurServices>
        <Teams></Teams>
        </>
    );
};

export default Home;