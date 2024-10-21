import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function MovieDetailsCard({title, details, cast, category, director, producer, rating, closeModal}) {
    const info = { title, details, cast, category, director, producer, rating };

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

                </div>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
}


export default MovieDetailsCard;