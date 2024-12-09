import React from 'react';
import { useNavigate } from 'react-router-dom';

function BookingCard({ booking }) {
    const { booking_id, nooftickets, totalprice, Promo_id, seatDetails, movieTitle } = booking;  // Destructure booking details
    console.log("book card")
    console.log(booking)
    const navigate = useNavigate();

    return (
        <div className="payment-card">
            <h3>Booking ID: {booking_id}</h3>
            <h3>Movie Title: {movieTitle}</h3>
            <p>Number of Tickets: {nooftickets}</p>
            <p>Total Price: ${totalprice}</p>
            {Promo_id && <p>Promo ID: {Promo_id}</p>} {/* Conditionally render Promo ID if it exists */}
            
            <div className="ticket-details">
                <h4>Ticket Details:</h4>
                {seatDetails && seatDetails.length > 0 ? (
                    seatDetails.map((ticket, index) => (
                        <div key={index} className="ticket">
                            <p>Showtime: {ticket.showtime}</p>
                            <p>Seat: {ticket.seat_description}</p>

                        </div>
                    ))
                ) : (
                    <p>No ticket details available.</p>
                )}
            </div>

            <button 
                onClick={() => navigate(`/booking/${booking_id}`)} 
                className="view-booking-button"
            >
                View Booking Details
            </button>
        </div>
    );
}

export default BookingCard;
