import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { Link } from 'react-router-dom';


function Checkout() {
const [movie_name, setmovie_name] = useState(null);
const [time, settime] = useState(null);
const [seat, setseat] = useState(null);
const [number_tickets, setnumber_tickets] = useState(null);
const [adult_tickets, setadult_tickets] = useState(null);
const [child_tickets, setchild_tickets] = useState(null);
const [total, settotal] = useState(null);

  useEffect(() => {
    const movie_name = localStorage.getItem('movie');
    const time = localStorage.getItem('time');
    const seat = localStorage.getItem('seat');
    const number_tickets = localStorage.getItem('number_of_tickets');
    const adult_tickets = localStorage.getItem('adult_tickets');
    const child_tickets = localStorage.getItem('children_tickets');
    const total = localStorage.getItem('total');

    if (movie_name) {
      setmovie_name(movie_name);
    }
    if (time) {
      settime(time);
    }
    if (seat) {
      setseat(seat);
    }
    if (number_tickets) {
      setnumber_tickets(number_tickets);
    }
    if (adult_tickets) {
      setadult_tickets(adult_tickets);
    }
    if (child_tickets) {
      setchild_tickets(child_tickets);
    }
    if (total) {
        settotal(total);
    }
  }, []);

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
        <p><strong>Movie:{movie_name}</strong></p>
        <p><strong>Showtime:{time}</strong></p>
        <p><strong>Selected Seats:{number_tickets}</strong> </p>
        <p><strong>Adult Tickets:{adult_tickets}</strong> </p>
        <p><strong>Kid Tickets:{child_tickets}</strong></p>
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
