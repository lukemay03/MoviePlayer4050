import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import AdminHeader from './components/AdminHeader';

function EditMovie() {
    const location = useLocation();
  const {state} = location || {};
  //console.log(state);
  const {cast,category, director, movie_rating, movie_title, producer, synopsis, trailer_link, trailer_picture} = state || {};
    return (
        <body>
        <AdminHeader></AdminHeader>
        {/*<p>This is the Edit movie page</p>*/}
        <div>
            <Link to="/manage-movies">
                <button>Manage Movies</button>
            </Link>

            <Link to="/manage-users">
                <button>Manage Users</button>
            </Link>
            <Link to="manage-promotions"><button>Manage Promotions</button></Link>
        </div>

        <form className="movie-form">
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="movie_title" name="movie_title" placeholder={movie_title}/>
            </div>
            <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <input type="text" id="movie_rating" name="movie_rating" placeholder={movie_rating}/>
            </div>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" placeholder={category}/>
            </div>
            <div className="form-group">
                <label htmlFor="cast">Cast:</label>
                <input type="text" id="cast" name="cast" placeholder={cast}/>
            </div>
            <div className="form-group">
                <label htmlFor="director">Director:</label>
                <input type="text" id="director" name="director" placeholder="Director"/>
            </div>
            <div className="form-group">
                <label htmlFor="producer">Producer:</label>
                <input type="text" id="producer" name="producer" placeholder={producer}/>
            </div>
            <div className="form-group">
                <label htmlFor="synopsis">Synopsis:</label>
                <textarea id="synopsis" name="synopsis" placeholder={synopsis}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="trailer_picture">Trailer Picture URL:</label>
                <input type="text" id="trailer_picture" name="trailer_picture"
                       placeholder={trailer_picture}/>
            </div>
            <div className="form-group">
                <label htmlFor="trailer_link">Trailer Link:</label>
                <input type="text" id="trailer_link" name="trailer_link" placeholder={trailer_link}/>
            </div>
            <div className="form-group">
                <label htmlFor="current_running">Currently Running:</label>
                <select id="current_running" name="current_running">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="Name">Change Theater Schedule:</label>
              <input name="Date" placeholder="Date 01/10/2002" />
                <div>
                    <button type="submit">12pm</button>
                    <button type="submit">5pm</button>
                    <button type="submit">8pm</button>
                </div>
            </div>


            <Link to="/manage-movies">
                <button type="submit" className="submit-edits-button">Submit Changes</button>
            </Link>

        </form>
        </body>
    );
}

export default EditMovie;
