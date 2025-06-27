import React from 'react';
import { FaShippingFast, FaGlobe, FaWarehouse, FaMoneyBillWave, FaBoxOpen, FaUndo } from 'react-icons/fa';

const ServiceCard = ({ icon, title, description, highlighted }) => {
    const cardClasses = `
        bg-white rounded-lg p-8 shadow-md transition-transform transform hover:-translate-y-2
        ${highlighted ? 'bg-green-200' : ''}
    `;

    const iconContainerClasses = `
        text-4xl mb-4
        ${highlighted ? 'text-green-800' : 'text-indigo-500'}
    `;

    return (
        <div className={cardClasses}>
            <div className={iconContainerClasses}>
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">
                {description}
            </p>
        </div>
    );
};

const OurServices = () => {
    const services = [
        {
            icon: <FaShippingFast />,
            title: 'Express & Standard Delivery',
            description: 'We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.',
        },
        {
            icon: <FaGlobe />,
            title: 'Nationwide Delivery',
            description: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.',
            highlighted: true,
        },
        {
            icon: <FaWarehouse />,
            title: 'Fulfillment Solution',
            description: 'We also offer customized service with inventory management support, online order processing, packaging, and after-sales support.',
        },
        {
            icon: <FaMoneyBillWave />,
            title: 'Cash on Home Delivery',
            description: '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
        },
        {
            icon: <FaBoxOpen />,
            title: 'Corporate Service / Contract in Logistics',
            description: 'Customized corporate services which includes warehouse and inventory management support.',
        },
        {
            icon: <FaUndo />,
            title: 'Parcel Return',
            description: 'Through our reverse logistics facility, we allow end customers to return or exchange their products with online business merchants.',
        },
    ];

    return (
        <section className="bg-gray-900 py-20 px-4 mb-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">Our Services</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;