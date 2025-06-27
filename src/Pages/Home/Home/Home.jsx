import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../../../Components/HowItWorks';
import OurServices from '../../../Components/OurServices';
import Teams from '../../../Components/Teams';
import ServiceBig from '../../../Components/ServiceBig';
import Marchant from '../../../Components/Marchant';

const Home = () => {
    return (
        <>
        <Banner></Banner>
        <HowItWorks></HowItWorks>
        <OurServices></OurServices>
        <Teams></Teams>
        <ServiceBig></ServiceBig>
        <Marchant></Marchant>
        </>
    );
};

export default Home;