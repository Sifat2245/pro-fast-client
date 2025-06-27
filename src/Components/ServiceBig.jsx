import React from 'react';
import liveTrackingImage from '../assets/live-tracking.png';
import safeDeliveryImage from '../assets/safe-delivery.png';
import supportImage from '../assets/safe-delivery.png'; // Assuming you have an image for support

const ServiceBig = () => {
    const styles = {
        container: {
            padding: '2rem',
            fontFamily: 'sans-serif',
        },
        serviceCard: {
            borderRadius: '1rem',
            background: '#ffffff',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            border: '1px solid #e2e8f0',
        },

        illustrationContainer: {
            flexShrink: 0,
            marginRight: '2.5rem',
            width: '150px',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        illustration: {
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
        },
        content: {
            flexGrow: 1,
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '0.5rem',
        },
        description: {
            fontSize: '1rem',
            color: '#718096',
            lineHeight: '1.6',
        }
    };

    return (
        <div style={styles.container} className='w-4/5 mx-auto mb-24'>
            <div style={styles.serviceCard}>
                <div style={styles.illustrationContainer}>
                    <img 
                        src={liveTrackingImage} 
                        alt="Live Parcel Tracking" 
                        style={styles.illustration} 
                    />
                </div>
                <div style={styles.content}>
                    <h3 style={styles.title}>Live Parcel Tracking</h3>
                    <p style={styles.description}>
                        Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.
                    </p>
                </div>
            </div>

            <div style={styles.serviceCard}>
                <div style={styles.illustrationContainer}>
                    <img 
                        src={safeDeliveryImage} 
                        alt="100% Safe Delivery" 
                        style={styles.illustration}
                    />
                </div>
                <div style={styles.content}>
                    <h3 style={styles.title}>100% Safe Delivery</h3>
                    <p style={styles.description}>
                        We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.
                    </p>
                </div>
            </div>

            <div style={{ ...styles.serviceCard }}>
                 <div style={styles.illustrationContainer}>
                    <img 
                        src={supportImage} 
                        alt="24/7 Call Center Support" 
                        style={styles.illustration}
                    />
                </div>
                <div style={styles.content}>
                    <h3 style={styles.title}>24/7 Call Center Support</h3>
                    <p style={styles.description}>
                        Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServiceBig;