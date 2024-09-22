import React from 'react';
import Header from './components/Header';
import { Link } from 'react-router-dom';


function Checkout() {
  return (
    <div className="checkout-page">
      <Header></Header>
        <div className="summary-section">
        <h2 class="checkout-h">Order Summary</h2>
        <p><strong>Movie:</strong></p>
        <p><strong>Showtime:</strong></p>
        <p><strong>Selected Seats:</strong> </p>
        <p><strong>Adult Tickets:</strong> </p>
        <p><strong>Kid Tickets:</strong></p>
        <h3>Total: </h3>
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