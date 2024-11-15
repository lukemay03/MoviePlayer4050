import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { Link, useLocation, useParams } from 'react-router-dom';
import './TheaterLayout.css';

function TicketSelect() {
  const location = useLocation();
  const { movieName } = useParams();
  const { name = '', selectedShowtime = '', selectedSeats = [], adultCount = 0, kidCount = 0 } = location.state || {};

  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtimeState, setSelectedShowtime] = useState(selectedShowtime);
  const [selectedAuditorium, setSelectedAuditorium] = useState(''); 
  const [adultCountState, setAdultCount] = useState(adultCount);
  const [kidCountState, setKidCount] = useState(kidCount);
  const [selectedSeatsState, setSelectedSeats] = useState(selectedSeats);
  const [theaterSeats, setTheaterSeats] = useState([]);

  //fetch showtimes
  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/movies/${movieName}/showtimes`);
        if (response.ok) {
          const data = await response.json();
          setShowtimes(data.showtimes);
        } else {
          console.error('Failed to fetch showtimes');
        }
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };
    fetchShowtimes();
  }, [movieName]);

  //generate theater layout based on available seats
  const generateTheaterLayout = (availableSeats) => {
    const rows = Math.ceil(availableSeats / 10); //10 seats per row for now
    const seats = [];
    for (let row = 0; row < rows; row++) {
      seats.push(Array.from({ length: Math.min(10, availableSeats - row * 10) }, (_, i) => `${String.fromCharCode(65 + row)}${i + 1}`));
    }
    return seats;
  };

  //handle showtime selection
  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime.startTime);
    setSelectedAuditorium(showtime.theaterName); 
    const layout = generateTheaterLayout(showtime.availableSeats);
    setTheaterSeats(layout);
  };

  const handleSeatClick = (seat) => {
    if (selectedSeatsState.includes(seat)) {
      setSelectedSeats(selectedSeatsState.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeatsState, seat]);
    }
  };

  const totalTickets = adultCountState + kidCountState;

  const handleCheckoutClick = (e) => {
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
    kidCount: kidCountState,
    auditorium: selectedAuditorium //save auditorium in cart data
  }));

  //format showtimes to look better
  const formatDateTime = (dateTimeString) => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  return (
    <div className="ticket-select">
      <Header />
      <div className="regConfirm">
        <h3>Booking for Movie: {name}</h3>

        <h3>Select a Showtime to See Available Seats:</h3>
        <div className="showtime-options">
        {showtimes.length > 0 ? (
         showtimes.map((showtime, index) => {
         const showDate = new Date(showtime.startTime);

      const formattedDate = showDate.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const formattedTime = showDate.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      return (
        <button
          key={index}
          onClick={() => handleShowtimeSelect(showtime)}
          className={selectedShowtimeState === showtime.startTime ? 'selected' : ''}
        >
          <div className="showtime-datetime">
            {formattedDate} at {formattedTime}
          </div>
          <div className="showtime-details">
            {showtime.theaterName} - {showtime.availableSeats} seats available
          </div>
        </button>
      );
    })
  ) : (
    <p>No showtimes available for this movie.</p>
  )}
</div>
 
            
        <div className="theater-layout">
          <div className="screen">Theater Screen</div>
          <div className="seats">
            {theaterSeats.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map(seat => (
                  <div
                    key={seat}
                    className={`seat ${selectedSeatsState.includes(seat) ? 'selected' : ''}`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat}
                  </div>
                ))}
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
          state={{ name, selectedShowtime: selectedShowtimeState, selectedSeats: selectedSeatsState, adultCount: adultCountState, kidCount: kidCountState, auditorium: selectedAuditorium }}
          onClick={handleCheckoutClick}
        >
          <button>Check Out</button>
        </Link>
      </div>
    </div>
  );
}

export default TicketSelect;
