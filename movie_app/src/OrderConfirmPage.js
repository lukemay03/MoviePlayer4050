import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';

function RegistrationConfirm() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  //destructure the order details from location.state
  const {
    name = 'Unknown Movie',
    selectedShowtime = 'No Showtime Selected',
    selectedSeats = [],
    adultCount = 0,
    kidCount = 0,
    auditorium = 'Unknown Auditorium',
    total = 0,
  } = location.state || {};

  useEffect(() => {
    //send token and get user's email
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        //clear cart data after confirming order
        localStorage.removeItem('cartData'); 
        //parse data
        const data = await response.json();
        if (response.ok) {
          setEmail(data.email);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error(error.message);
        setErrorMessage('Error fetching user data');
      }
    };

    fetchUserProfile();
  }, []);

   // This function sends a request to the backend to send the email
  const sendConfirmationEmail = async () => {
    if (!email) {
      console.error('No email available.');
      return;
    }

    try {
      const htmlMessage = `
        <h2>Thank you for your order!</h2>
        <p><strong>Movie:</strong> ${name}</p>
        <p><strong>Showtime:</strong> ${new Date(selectedShowtime).toLocaleString()}</p>
        <p><strong>Auditorium:</strong> ${auditorium}</p>
        <p><strong>Selected Seats:</strong> ${selectedSeats.join(', ')}</p>
        <p><strong>Adult Tickets:</strong> ${adultCount}</p>
        <p><strong>Kid Tickets:</strong> ${kidCount}</p>
        <h3><strong>Total:</strong> $${total}.00</h3>
        <p>We hope you enjoy the movie!</p>
        <p>Best regards,</p>
        <p>Movie Player Co.</p>
      `;

      const subject = 'Order Confirmation';
      const response = await fetch('http://localhost:3001/trigger-order-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, htmlMessage, subject }), // passes the user email to the backend
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
      } else {
        setErrorMessage(`Failed to send email: ${data.message}`);
      }
    } catch (error) {
      console.error('Error sending email:', error.message);
      setErrorMessage('Error sending confirmation email');
    }
  };

  // Trigger email sending when the component loads
  useEffect(() => {
    if (email) {
      sendConfirmationEmail();
    }
  }, [email]);

  return (
    <div className="register-container">
      <Header />
      <div className="regConfirm">
        {errorMessage ? (
          <h2>{errorMessage}</h2>
        ) : (
          <>
            <h2>{successMessage}</h2>
            <p><strong>Movie:</strong> {name}</p>
            <p><strong>Showtime:</strong> {new Date(selectedShowtime).toLocaleString()}</p>
            <p><strong>Auditorium:</strong> {auditorium}</p>
            <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
            <p><strong>Adult Tickets:</strong> {adultCount}</p>
            <p><strong>Kid Tickets:</strong> {kidCount}</p>
            <h3><strong>Total:</strong> ${total}.00</h3>
          </>
        )}
      </div>
    </div>
  );
  
}

export default RegistrationConfirm;
