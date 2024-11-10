import React, { useState } from 'react';
import Header from './components/Header';
import { Link, useLocation} from 'react-router-dom';
import './TheaterLayout.css';


function TicketSelect() {
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [adultCount, setAdultCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const showtimes = ['12:00 PM', '5:00 PM', '8:00 PM'];
  //const info = location.state;
  const location = useLocation();
  const {state} = location || {};
  const {image,name} = state || {};
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 8;

  
  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat)); 
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

localStorage.setItem('movie', JSON.stringify(name));
const movie = localStorage.getItem('movie');
localStorage.setItem('time', 12.00);
const time = localStorage.getItem('time');
localStorage.setItem('seat', "A1");
const seat = localStorage.getItem('seat');
localStorage.setItem('number_of_tickets', 2);
const numoftic = localStorage.getItem('number_of_tickets');
localStorage.setItem('adult_tickets', 1);
const adulttic = localStorage.getItem('adult_tickets');
localStorage.setItem('children_tickets', 1);
const childtic = localStorage.getItem('children_tickets');

const price = (adulttic * 15) + (childtic * 9);
localStorage.setItem('total', price);




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
            onClick={() => setSelectedShowtime(showtime)} 
            className={selectedShowtime === showtime ? 'selected' : ''}
          >
            {showtime}
          </button>
        ))}
      </div>
    
      <div className="theater-layout">
      <div className="screen">Theater Screen Here</div>
      <div className="seats">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
              const seat = `${row}${seatIndex + 1}`;
              return (
                <div
                  key={seat}
                  className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>

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
