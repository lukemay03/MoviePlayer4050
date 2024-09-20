import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({poster, title, trailerLink, detailsLink }) {
  const info = { image: poster, name: title};

    return (
      <div className="movie-card">
       <iframe src={trailerLink} title="Movie Trailer"></iframe>
        <h3>{title}</h3>
  
        <div className="movie-links">
          <Link to={{ pathname: '/ticket-select' }} state={info}>Book Tickets</Link>
          <Link to={detailsLink}>Movie Details</Link>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
  