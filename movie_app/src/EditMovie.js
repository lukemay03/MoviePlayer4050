import React from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from './components/AdminHeader';

function EditMovie() {
    return (
        <body>
        <AdminHeader></AdminHeader>
        {/*<p>This is the Edit movie page</p>*/}
        <Link to="/manage-movies">
            <button>Manage Movies</button>
        </Link>

        <Link to="/manage-promotions">
            <button>Manage Promotions</button>
        </Link>

        <Link to="/manage-users">
            <button>Manage Users</button>
        </Link>

        <form className="movie-form">
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="movie_title" name="movie_title" placeholder="Shrek"/>
            </div>
            <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <input type="text" id="movie_rating" name="movie_rating" placeholder="PG"/>
            </div>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Cartoon"/>
            </div>
            <div className="form-group">
                <label htmlFor="cast">Cast:</label>
                <input type="text" id="cast" name="cast" placeholder="Cast list"/>
            </div>
            <div className="form-group">
                <label htmlFor="director">Director:</label>
                <input type="text" id="director" name="director" placeholder="Director"/>
            </div>
            <div className="form-group">
                <label htmlFor="producer">Producer:</label>
                <input type="text" id="producer" name="producer" placeholder="Producer"/>
            </div>
            <div className="form-group">
                <label htmlFor="synopsis">Synopsis:</label>
                <textarea id="synopsis" name="synopsis" placeholder="Movie synopsis"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="trailer_picture">Trailer Picture URL:</label>
                <input type="text" id="trailer_picture" name="trailer_picture"
                       placeholder="URL of the trailer picture"/>
            </div>
            <div className="form-group">
                <label htmlFor="trailer_link">Trailer Link:</label>
                <input type="text" id="trailer_link" name="trailer_link" placeholder="URL of the trailer"/>
            </div>
            <div className="form-group">
                <label htmlFor="current_running">Currently Running:</label>
                <select id="current_running" name="current_running">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>


            <Link to="/manage-movies">
                <button type="submit" className="submit-edits-button">Submit Changes</button>
            </Link>

        </form>
        </body>
    );
}

export default EditMovie;