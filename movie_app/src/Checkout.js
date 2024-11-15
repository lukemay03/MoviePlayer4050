import React, { useEffect } from 'react';
import Header from './components/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  //redirect if cart data is missing
  useEffect(() => {
    if (!location.state && !localStorage.getItem('cartData')) {
      alert('Your cart is empty. Redirecting to home page.');
      navigate('/');
    }
  }, [location.state, navigate]);

  //retrieve cart data from localStorage if not in state
  const storedCartData = JSON.parse(localStorage.getItem('cartData')) || {};
  const { 
    name = storedCartData.name || 'Unknown Movie', 
    selectedShowtime = storedCartData.selectedShowtime || 'No Showtime Selected', 
    selectedSeats = storedCartData.selectedSeats || [], 
    adultCount = storedCartData.adultCount || 0, 
    kidCount = storedCartData.kidCount || 0,
    auditorium = storedCartData.auditorium || 'Unknown Auditorium'  
  } = location.state || storedCartData;

  const total = adultCount * 15 + kidCount * 9;

  const role = localStorage.getItem('role');
  if (role == null) {
    return (
      <div>
        <Header />
        <p>Please Log in before proceeding to check out</p>
      </div>
    );
  }

  //clear cart function
  const handleClearCart = () => {
    localStorage.removeItem('cartData');
    alert('Cart has been cleared.');
    window.location.href = '/'; //redirect to home page
  };

  //format showtime date and time
  const formatDateTime = (dateTimeString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  return (
    <div className="checkout-page">
      <Header />
      <div className="summary-section">
        <h2 className="checkout-h">Order Summary</h2>
        <p><strong>Movie: {name}</strong></p>
        <p><strong>Showtime: {formatDateTime(selectedShowtime)}</strong></p> 
        <p><strong>Auditorium: {auditorium}</strong></p> 
        <p><strong>Selected Seats: {selectedSeats.join(', ')}</strong></p>
        <p><strong>Adult Tickets: {adultCount}</strong></p>
        <p><strong>Kid Tickets: {kidCount}</strong></p>
        <h3>Total: ${total}.00</h3>
        
        {/* Dynamically generate the URL with the movie name */}
        <Link 
          to={`/ticket-select/${encodeURIComponent(name)}`} 
          state={{ name, selectedShowtime, selectedSeats, adultCount, kidCount, auditorium }}
        >
          <button className="revert-button">Go back/Update order</button>
        </Link>
        <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
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

          <button className="confirm-button" type="submit">Confirm and Pay</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
