import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { Link, useLocation} from 'react-router-dom';


function Checkout() {
const location = useLocation();
const { name, selectedShowtime, selectedSeats, adultCount, kidCount } = location.state || {};
const total = adultCount*15 + kidCount*9;

const role = localStorage.getItem('role');
if (role == null) {
    return (
        <div>
        <Header></Header>
        <p>Please Log in before proceeding to check out</p>
        </div>
    );
}

  return (
    <div className="checkout-page">
      <Header></Header>
        <div className="summary-section">
        <h2 class="checkout-h">Order Summary</h2>
        <p><strong>Movie:{name}</strong></p>
        <p><strong>Showtime:{selectedShowtime}</strong></p>
        <p><strong>Selected Seats:{selectedSeats}</strong> </p>
        <p><strong>Adult Tickets:{adultCount}</strong> </p>
        <p><strong>Kid Tickets:{kidCount}</strong></p>
        <h3>Total: ${total}.00 </h3>
        <Link to="/ticket-select"><button className="revert-button">Go back/Update order</button></Link>
      </div>

        <div className="payment-section">
        <h2 className="checkout-h">Payment Information</h2>
        <form>
          <div className="input-group">
            <label htmlFor="cardholderName">Cardholder Name:</label>
            <input type="text" id="cardholderName" placeholder="John Doe" />
          </div>

          <div className="input-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" placeholder="1234 5678 9123 4567" />
          </div>

          <div className="input-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="text" id="expiryDate" placeholder="MM/YY" />
          </div>

          <div className="input-group">
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" placeholder="123" />
          </div>

          <div className="input-group">
            <label htmlFor="billingAddress">Billing Address:</label>
            <input type="text" id="billingAddress" placeholder="123 Main St, City, State" />
          </div>

          <Link to="/order-confirm"><button className="confirm-button" type="submit">Confirm and Pay</button></Link>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
