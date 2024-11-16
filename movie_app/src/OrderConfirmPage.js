import React, { useState, useEffect } from 'react';
import Header from './components/Header';



function RegistrationConfirm() {

  const [email, setEmail] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    //send token and get user's email
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  
          },
        });
        localStorage.removeItem('cartData');
        //parse response
        const data = await response.json();
        //console.log(data);
        if (response.ok) {
          setEmail(data.email);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.log(error.message)
        setErrorMessage('Error fetching user data');
      }
    };

    fetchUserProfile();
  }, []);

  // This function sends a request to the backend to send the email
  const sendConfirmationEmail = async () => {
    if (!email) {
      console.log("No email");
    }
    try {
        const htmlMessage = "<h2>Thank you for ordering!</h2>" +
            "<p>Your order is confirmed. We hope you enjoy the movie!</p>" +
            "<p>Best regards,</p>" +
            "Movie Player Co.";
        const subject = "Order Confirmation";
        const response = await fetch('http://localhost:3001/trigger-order-confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, htmlMessage, subject }), // passes the user email to the backend
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
  if (email) {
    sendConfirmationEmail();

  }
}, [email]); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="register-container">
      <Header></Header>
      <div class="regConfirm">
        <p>{email}</p>
        <h1> Thank you for Confirming! </h1>
        <h2> Check your e-mail for a confirmation.</h2>
      </div>
    </div>
  );
}

export default RegistrationConfirm;