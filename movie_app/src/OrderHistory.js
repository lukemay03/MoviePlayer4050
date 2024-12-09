import { useEffect, useState } from 'react';
import Header from './components/Header';
import BookingCard from './components/BookingCard';
import { Link } from 'react-router-dom';

function OrderHistory() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setUserId(localStorage.getItem('id'));

        // Fetch the bookings first
        const response = await fetch('http://localhost:3001/booking/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching bookings:', errorData.message);
          return;
        }

        const bookingsData = await response.json();
        const bookingsWithDetails = await Promise.all(bookingsData.bookings.map(async (booking) => {
          // Fetch seat details for each booking
          const seatResponse = await fetch(`http://localhost:3001/booking/${booking.booking_id}/seats`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          const seatData = seatResponse.ok ? await seatResponse.json() : { seatDetails: [] };

          // Fetch movie title for each booking
          const movieResponse = await fetch(`http://localhost:3001/booking/${booking.booking_id}/movie`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          const movieData = movieResponse.ok ? await movieResponse.json() : { movieTitle: 'N/A' };

          return {
            ...booking,
            seatDetails: seatData.seatDetails,
            movieTitle: movieData.movieTitle,
          };
        }));

        setBookings(bookingsWithDetails); // Store the aggregated data
      } catch (err) {
        console.log('Error in fetching data:', err);
      }
    };

    fetchBookings();
  }, []);
  console.log("book is");
  console.log(bookings);

  return (
    <div>
      <Header />
      <h1>Order History</h1>
      <div className="edit-payments-container">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard
              key={booking.booking_id}
              booking={booking} // Pass complete booking data to BookingCard
            />
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
