import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';

function ForgotPasswordConfirm() {
    const location = useLocation();
    const { email } = location.state || {}; // Retrieve email from state
    const [errorMessage, setErrorMessage] = useState('');
    console.log("Retrieved email:", email);

    // This function sends a request to the backend to send the email
    const sendPasswordEmail = async () => {
        try {
            var token;

            const responseToken = await fetch('http://localhost:3001/generate-token', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email}),
            });

            //parse the response
            const dataToken = await responseToken.json();
            //if authenticated, store token for future requests and load home page
            if (responseToken.ok) {
                token = dataToken.token;
            } else {
                setErrorMessage(dataToken.message || 'Invalid email');
            }
            const htmlMessage = "<h2>Forgot Password Link</h2>" +
                "<p>Here is your link to reset your password: <a href=\"http://localhost:3000/reset-pass?token=" + token + "\">Reset Password</a></p>" +
                "<p>Best regards,</p>" +
                "Movie Player Co.";
            const subject = "Password Reset";
            const response = await fetch('http://localhost:3001/trigger-order-confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, htmlMessage, subject}), // passes the user email to the backend
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
        sendPasswordEmail();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="register-container">
            <Header />
            <div className="regConfirm">
                <h1>Password Reset Link Sent!</h1>
                <h2>Check your e-mail for a link to reset your password.</h2>
            </div>
        </div>
    );
}

export default ForgotPasswordConfirm;