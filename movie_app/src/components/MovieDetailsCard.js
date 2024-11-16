import React from 'react';


function MovieDetailsCard({ title, details, cast, category, director, producer, rating, showtimes, closeModal }) {
    return (
        <div className="movie-details-container" onClick={closeModal}>
            <div className="movie-details" onClick={(e) => e.stopPropagation()}>
                <center><h1>Movie Details</h1></center>
                <button className="close-button" onClick={closeModal}>✖</button>

                <div className="details-content">
                    <div className="details-row">
                        <div className="details-label">Title:</div>
                        <div className="details-value">{title}</div>
                    </div>

                    <div className="details-row">
                        <div className="details-label">Cast:</div>
                        <div className="details-value">{cast}</div>
                    </div>

                    <div className="details-row">
                        <div className="details-label">Category:</div>
                        <div className="details-value">{category}</div>
                    </div>

                    <div className="details-row">
                        <div className="details-label">Director:</div>
                        <div className="details-value">{director}</div>
                    </div>

                    <div className="details-row">
                        <div className="details-label">Producer:</div>
                        <div className="details-value">{producer}</div>
                    </div>

                    <div className="details-row">
                        <div className="details-label">Rating:</div>
                        <div className="details-value">{rating}</div>
                    </div>

                    <div className="details-row">
                        <div className="details-label">Synopsis:</div>
                        <div className="details-value">{details}</div>
                    </div>

                    <div className="details-row">
                     <div className="details-label">Showtimes:</div>
                     <div className="details-value">
                      {showtimes.length > 0 ? (
                        <ul>
                        {showtimes.map((showtime, index) => {
                         const showDate = new Date(showtime.startTime); 
                         const formattedDate = showDate.toLocaleDateString(undefined, {
                         weekday: 'short',
                         month: 'short',
                         day: 'numeric',
                         year: 'numeric',
                        });
                    const formattedTime = showDate.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    });

                    return (
                        <li key={index}>
                            {formattedDate} at {formattedTime} - {showtime.theaterName}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <p>No showtimes available.</p>
        )}
    </div>
</div>

                </div>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}

export default MovieDetailsCard;
