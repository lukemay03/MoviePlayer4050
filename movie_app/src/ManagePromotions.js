import React from 'react';
import {Link} from 'react-router-dom';
import AdminHeader from './AdminHeader';

function ManagePromotions() {
    return (
        <body>
        <AdminHeader></AdminHeader>
        <Link to="/manage-movies">
            <button>Manage Movies</button>
        </Link>

        <Link to="/manage-promotions">
            <button>Manage Promotions</button>
        </Link>

        <Link to="/manage-users">
            <button>Manage Users</button>
        </Link>

        <div className="container">
            <div className="search-bar">
                <input type="text" placeholder="Search for movies by title..."></input>
                <button>Search</button>
            </div>

            <div className="movie-category">
                <h2>Now Playing</h2>
                <div className="movie">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/sampleTrailer1"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <h3>Movie Title 1</h3>
                    <p>Release Date: June 2024</p>
                    <Link to="Edit Movie">
                        <button>Edit Movie</button>
                    </Link>
                </div>
                <div className="movie">
                    <iframe src="https://www.youtube.com/embed/sampleTrailer2" title="Movie Trailer"></iframe>
                    <h3>Movie Title 2</h3>
                    <p>Release Date: May 2024</p>
                    <Link to="Edit Movie">
                        <button>Edit Movie</button>
                    </Link>
                </div>
            </div>

            <div className="movie-category">
                <h2>Coming Soon</h2>
                <div className="movie">
                    <iframe src="https://www.youtube.com/embed/sampleTrailer3" title="Movie Trailer"></iframe>
                    <h3>Movie Title 3</h3>
                    <p>Release Date: December 2024</p>
                    <Link to="Edit Movie">
                        <button>Edit Movie</button>
                    </Link>
                </div>
                <div className="movie">
                    <iframe src="https://www.youtube.com/embed/sampleTrailer4" title="Movie Trailer"></iframe>
                    <h3>Movie Title 4</h3>
                    <p>Release Date: November 2024</p>
                    <Link to="Edit Movie">
                        <button>Edit Movie</button>
                    </Link>
                </div>
            </div>
        </div>
        </body>
    );
}

export default ManagePromotions;