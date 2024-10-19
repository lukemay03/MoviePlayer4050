import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';

function RegistrationConfirm() {
    const location = useLocation();
    const { email } = location.state || {}; // Retrieve email from state
    console.log("Retrieved email:", email);

    // This function sends a request to the backend to send the email
    const sendConfirmationEmail = async () => {
        try {
            const response = await fetch('http://localhost:3001/trigger-order-confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // passes the user email to the backend
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data.message); // "Confirmation email sent."
            } else {
                console.error('Failed to send email:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Trigger email sending when the component loads
    useEffect(() => {
        sendConfirmationEmail();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="register-container">
            <Header />
            <div className="regConfirm">
                <h1>Thank you for Registering!</h1>
                <h2>Check your e-mail for a confirmation.</h2>
            </div>
        </div>
    );
}

export default RegistrationConfirm;