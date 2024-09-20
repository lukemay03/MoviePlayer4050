import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({poster, title, trailerLink, bookingLink, detailsLink }) {
    return (
      <div className="movie-card">
       <iframe src={trailerLink} title="Movie Trailer"></iframe>
        <h3>{title}</h3>
  
        <div className="movie-links">
          <Link to={bookingLink}>Book Tickets</Link>
          <Link to={detailsLink}>Movie Details</Link>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
  