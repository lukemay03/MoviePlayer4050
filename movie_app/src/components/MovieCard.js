import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function MovieCard({poster, title, trailerLink, detailsLink }) {
  const info = { image: poster, name: title};
  const [showTrailer, setShowTrailer] = useState(false);

  const toggleTrailer = () => {
    setShowTrailer(prevState => !prevState);
  };

    return (
      <div className="movie-card">
        {showTrailer ? (
        <iframe
          src={trailerLink}
          title={`${title} Trailer`}
          width="300"
          height="200"
          allowFullScreen
        />
      ) : (
        <img src={`/${poster}`} alt={title} className="movie-poster" />
      )}
        <h3>{title}</h3>
  
        <div className="movie-links">
        <button onClick={toggleTrailer}>
        {showTrailer ? 'Show Poster' : 'Watch Trailer'}
        </button>
        <Link to={{ pathname: '/ticket-select' }} state={info}>Book Tickets</Link>
        <Link to={detailsLink}>Movie Details</Link>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
  