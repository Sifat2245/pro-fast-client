import React from 'react';
import { motion } from 'framer-motion';
import casioLogo from '../assets/brands/casio.png';
import amazonLogo from '../assets/brands/amazon.png';
import moonstarLogo from '../assets/brands/moonstar.png';
import starplusLogo from '../assets/brands/start-people 1.png';
import startpeopleLogo from '../assets/brands/start.png';
import randstadLogo from '../assets/brands/randstad.png';

const logos = [
    { src: casioLogo, alt: 'Casio' },
    { src: amazonLogo, alt: 'Amazon' },
    { src: moonstarLogo, alt: 'Moonstar' },
    { src: starplusLogo, alt: 'STR+' },
    { src: startpeopleLogo, alt: 'Start People' },
    { src: randstadLogo, alt: 'Randstad' },
];


const LogosSet = () => (
    <>
        {logos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 mx-8">
                <img
                    className="h-6 sm:h-8 object-contain" 
                    src={logo.src}
                    alt={logo.alt}
                />
            </div>
        ))}
    </>
);

const Teams = () => {
    return (
        <section className="bg-gray-100 py-12 mb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
                        We've helped thousands of sales teams
                    </h2>
                </div>

                <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <motion.div
                        className="flex"
                        animate={{
                            x: ['0%', '-100%'], 
                        }}
                        transition={{
                            ease: 'linear',
                            duration: 25, 
                            repeat: Infinity,
                        }}
                    >
                        {/* Render the set of logos */}
                        <LogosSet />
                        {/* Render it again for the seamless loop */}
                        <LogosSet />

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Teams;