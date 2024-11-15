import React, { useState } from 'react';
import Header from './components/Header';
import { Link, useLocation } from 'react-router-dom';
import './TheaterLayout.css';

function TicketSelect() {
  const location = useLocation();
  const { name = '', selectedShowtime = '', selectedSeats = [], adultCount = 0, kidCount = 0 } = location.state || {};

  const [selectedShowtimeState, setSelectedShowtime] = useState(selectedShowtime);
  const [adultCountState, setAdultCount] = useState(adultCount);
  const [kidCountState, setKidCount] = useState(kidCount);
  const [selectedSeatsState, setSelectedSeats] = useState(selectedSeats);

  const showtimes = ['12:00 PM', '5:00 PM', '8:00 PM'];
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 8;

  const handleSeatClick = (seat) => {
    if (selectedSeatsState.includes(seat)) {
      setSelectedSeats(selectedSeatsState.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeatsState, seat]);
    }
  };

  //calculate total tickets
  const totalTickets = adultCountState + kidCountState;

  const handleCheckoutClick = (e) => {
    //check if seat count matches ticket count
    if (selectedSeatsState.length !== totalTickets) {
      e.preventDefault(); 
      alert(`Please select exactly ${totalTickets} seats to match the number of tickets.`);
    }
  };

  //save cart data to localStorage to return if we leave page
  localStorage.setItem('cartData', JSON.stringify({
    name,
    selectedShowtime: selectedShowtimeState,
    selectedSeats: selectedSeatsState,
    adultCount: adultCountState,
    kidCount: kidCountState
  }));

  return (
    <div className="ticket-select">
      <Header />
      <div className="regConfirm">
        <h3>Booking for Movie: {name}</h3>
        <h3>Choose a Date:
          <input type="date" id="date" />
        </h3>
        <h3>Select a Showtime</h3>
        <div className="showtime-options">
          {showtimes.map((showtime, index) => (
            <button
              key={index}
              onClick={() => setSelectedShowtime(showtime)}
              className={selectedShowtimeState === showtime ? 'selected' : ''}
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
                      className={`seat ${selectedSeatsState.includes(seat) ? 'selected' : ''}`}
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
            <button onClick={() => setAdultCount(adultCountState - 1)} disabled={adultCountState <= 0}>-</button>
            <span>{adultCountState}</span>
            <button onClick={() => setAdultCount(adultCountState + 1)}>+</button>
          </div>
          <div className="counter">
            <p>Kids ($9.00)</p>
            <button onClick={() => setKidCount(kidCountState - 1)} disabled={kidCountState <= 0}>-</button>
            <span>{kidCountState}</span>
            <button onClick={() => setKidCount(kidCountState + 1)}>+</button>
          </div>
        </div>

        <Link
          to={`/checkout/${name}`}
          state={{ name, selectedShowtime: selectedShowtimeState, selectedSeats: selectedSeatsState, adultCount: adultCountState, kidCount: kidCountState }}
          onClick={handleCheckoutClick} 
        >
          <button>Check Out</button>
        </Link>
      </div>
    </div>
  );
}

export default TicketSelect;

