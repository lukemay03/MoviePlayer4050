import React, { useState } from 'react';
import Header from './components/Header';
import { Link, useLocation} from 'react-router-dom';


function TicketSelect() {
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [adultCount, setAdultCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);

  const showtimes = ['12:00 PM', '5:00 PM', '8:00 PM'];
  //const info = location.state;
  const location = useLocation();
  const {state} = location;
  console.log(state)
  const {image,name} = state;

  return (
    <div className="ticket-select">
      <Header></Header>
      <div class="regConfirm">
        <h3> Booking for Movie: {name}</h3>
        <h3> Choose a Date: 
            <input type="date" id="date"></input>
        </h3>
        <h3>Select a Showtime</h3>
        <div className="showtime-options">
          
        {showtimes.map((showtime, index) => (
          <button 
            key={index}
            onClick={() => setSelectedShowtime(showtime)} //need to implement this
            className={selectedShowtime === showtime ? 'selected' : ''}
          >
            {showtime}
          </button>
        ))}
      </div>
    
          <h1>~Theater view here~</h1>

    <h2>Select Tickets</h2>
      <div className="ticket-counters">
        <div className="counter">
          <p>Adults ($15.00)</p>
          <button onClick={() => setAdultCount(adultCount - 1)} disabled={adultCount <= 0}>-</button>
          <span>{adultCount}</span>
          <button onClick={() => setAdultCount(adultCount + 1)}>+</button>
        </div>
        <div className="counter">
          <p>Kids ($9.00)</p>
          <button onClick={() => setKidCount(kidCount - 1)} disabled={kidCount <= 0}>-</button>
          <span>{kidCount}</span>
          <button onClick={() => setKidCount(kidCount + 1)}>+</button>
        </div>
      </div>

        <Link to="/checkout"><button>Checkout</button></Link>
      </div>
    </div>
  );
}

export default TicketSelect;