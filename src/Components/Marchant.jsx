import React from 'react';
import img4 from '../assets/location-merchant.png'
import bgimg from '../assets/be-a-merchant-bg.png'

const Marchant = () => {
    return (
        <div className='bg-[#03373D] w-4/5 mx-auto rounded-2xl p-24 mb-24' style={{
            backgroundImage: `url(${bgimg})`,
            backgroundRepeat: 'no-repeat'
        }}>
            <div className='flex gap-24 text-white'>
                <div>
                    <h1 className='text-4xl font-semibold mb-6'>
                        Merchant and Customer Satisfaction is Our First Priority
                    </h1>
                    <p className='mb-10'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier <br /> delivers your parcels in every corner of Bangladesh right on time.</p>
                    <button className='bg-[#CAEB66] rounded-4xl text-black py-3 px-6 mr-4'>Become a merchant</button>
                    <button className='border border-[#CAEB66] rounded-4xl text-[#CAEB66] py-3 px-6'>Earn With Profast courier</button>
                </div>
                <div>
                    <img src={img4} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Marchant;