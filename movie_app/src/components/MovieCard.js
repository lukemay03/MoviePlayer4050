import React from 'react';
import { Link } from 'react-router-dom';
import BuyTickets from '../BuyTickets';

function MovieCard({ poster, title, trailerLink, bookingLink, detailsLink }) {
    return (
      <div className="movie-card">
        <img src={poster} alt={`${title} poster`} className="movie-poster" />
  
        <h3>{title}</h3>
  
        <div className="movie-links">
          <Link to={trailerLink}>View Trailer</Link>
          <Link to={BuyTickets}>Book Tickets</Link>
          <Link to={detailsLink}>Movie Details</Link>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
  