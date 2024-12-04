import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promocheck, setpromocheck] = useState(0);
  const [discount, setDiscount] = useState(0); // State to store discount percentage
  const [total, setTotal] = useState(0); // State to store the total
  //redirect if cart data is missing
  useEffect(() => {
    if (!location.state && !localStorage.getItem('cartData')) {
      alert('Your cart is empty. Redirecting to home page.');
      navigate('/');
    }
  }, [location.state, navigate]);

  //retrieve cart data from localStorage if not in state
  const storedCartData = JSON.parse(localStorage.getItem('cartData')) || {};
  //destructuring object, location.state is first priority, if not applicable, get from local storage
  const { 
    name = storedCartData.name || 'Unknown Movie', 
    selectedShowtime = storedCartData.selectedShowtime || 'No Showtime Selected', 
    selectedSeats = storedCartData.selectedSeats || [], 
    adultCount = storedCartData.adultCount || 0, 
    kidCount = storedCartData.kidCount || 0,
    auditorium = storedCartData.auditorium || 'Unknown Auditorium'  
  } = location.state || storedCartData;
  const date = new Date(selectedShowtime);
  // Extract month, day, and year
  const month = date.getMonth() + 1;  // Months are zero-indexed, so add 1
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the date as MM/DD/YYYY
  const formattedDate = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
  console.log("formatted date is " + formattedDate)
  useEffect(() => {
    const baseTotal = adultCount * 15 + kidCount * 9; // Calculate the base total
    setTotal(baseTotal); // Set the total when relevant values change
  }, [adultCount, kidCount]); // Re-run only when adultCount or kidCount changes
  const role = localStorage.getItem('role');
  if (role == null) {
    return (
      <div>
        <Header />
        <p>Please Log in before proceeding to check out</p>
      </div>
    );
  }
  const applyPromoCode = async () => {
    if(promocheck === 1) {
      alert('You have already used a promo.');
      return;
    }
    if (!promoCode) {
      alert('Please enter a promo code.');
      return;
    };
    const requestData = {
      movie_title: name,
      promoCode: promoCode,
    };
      // Make the POST request to the backend API using fetch
      const response = await fetch('http://localhost:3001/promocode/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
    const data = await response.json();
    if (!response.ok) {
      alert(data.error);
      return;
  }
  //console.log(data);
  //console.log(formattedDate)
  if (data.date !== formattedDate) {
    alert('wrong date for promo');
    return;
  }
  const temp = data.description.replace('%', '')
  setDiscount(parseInt(temp));
  const discountedTotal = total - (total * (parseInt(temp) / 100));
  setTotal(discountedTotal);
  setpromocheck(1);
  };
    
    
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
        <h3>Discount: {discount}%</h3>
        <h3>Total: ${total.toFixed(2)}</h3>
        {/*dynamically generates the URL with the movie name */}
        <Link 
          to={`/ticket-select/${encodeURIComponent(name)}`} 
          state={{ name, selectedShowtime, selectedSeats, adultCount, kidCount, auditorium }}
        >
          <button className="revert-button">Go back/Update order</button>
        </Link>
        <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
        <label htmlFor="cardNumber">Promo Code:</label>
        <input type="text" id="PromoCode" placeholder="" value ={promoCode} onChange={(e) => setPromoCode(e.target.value)}  />
        <button onClick={applyPromoCode}>Apply Promo Code</button>
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

          {/*navigate to order confirmation page with state variables*/}
          <Link 
            to="/order-confirm"
            state={{ name, selectedShowtime, selectedSeats, adultCount, kidCount, auditorium, total }}
          >
            <button className="confirm-button" type="submit">Confirm and Pay</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
