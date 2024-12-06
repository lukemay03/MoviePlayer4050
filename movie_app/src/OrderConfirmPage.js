import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';

function RegistrationConfirm() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Destructure the order details from location.state
  const {
    promoID = 0,
    name = 'Unknown Movie',
    selectedShowtime = 'No Showtime Selected',
    selectedSeats = [],
    adultCount = 0,
    kidCount = 0,
    auditorium = 'Unknown Auditorium',
    total = 0,
  } = location.state || {};

  useEffect(() => {
    const insertOrderData = async () => {
      console.log('insert order data');
      if (!email) {
        console.error('No email available.');
        return;
      }

      const orderData = {
        promoID,
        email,
        name,
        selectedShowtime,
        selectedSeats,
        adultCount,
        kidCount,
        auditorium,
        total,
      };
      console.log(orderData);
      try {
        // Send request to insert the order into the database
        const insertResponse = await fetch('http://localhost:3001/insert-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData), // Send order data
        });

        const insertData = await insertResponse.json();
        if (insertResponse.ok) {
          console.log('Order successfully inserted:', insertData.message);
        } else {
          setErrorMessage(`Failed to insert order into database: ${insertData.message}`);
        }
      } catch (error) {
        console.error('Error inserting order:', error.message);
        setErrorMessage('Error processing your order');
      }
    };

    // Send token and get user's email
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Clear cart data after confirming order
        localStorage.removeItem('cartData'); 
        // Parse data
        const data = await response.json();
        if (response.ok) {
          setEmail(data.email);
          insertOrderData(); // Ensure order is inserted once email is set
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error(error.message);
        setErrorMessage('Error fetching user data');
      }
    };

    fetchUserProfile();
  }, [email]); // Ensure it re-runs only when email is updated

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

  // Trigger email sending once email is available and order has been inserted
  useEffect(() => {
    if (email && successMessage) {
      sendConfirmationEmail();
    }
  }, [email, successMessage]); // Only trigger when both email and successMessage are available

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
            <h3><strong>Total:</strong> ${total}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default RegistrationConfirm;
