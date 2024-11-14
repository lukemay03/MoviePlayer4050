import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function MovieCardAdmin({poster, title, trailerLink, detailsLink }) {
    //const info = { image: poster, name: title};
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
                <Link to="/edit-movie" state={detailsLink}><button>Edit Movie</button></Link>
                <Link to="/schedule-movie" state={detailsLink}><button>Schedule Movie</button></Link>
            </div>

        </div>
    );
}

export default MovieCardAdmin;