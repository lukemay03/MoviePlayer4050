import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
function Home() {
    const [current_movies, setCurrent_movie] = useState([]);
    const [comingsoon_movies, setComingSoon_movie] = useState([]);
    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3001/movie/trailers'),
            fetch('http://localhost:3001/movie/comingsoon'),
        ])
        .then(([resCurrent, resComingMovie]) =>
            Promise.all([resCurrent.json(), resComingMovie.json()])
    )
        .then(([current, coming]) => {
            setCurrent_movie(current);
            setComingSoon_movie(coming);
        });
    }, []);
    //const firstMovie = data[0];
    //const firstMovieTitle = firstMovie ? firstMovie.movie_title : 'Loading...';
    //const firstMovieTrailer = firstMovie ? firstMovie.trailer_link : '';
    return (
        <body>
        <Header></Header>
        <Link to="/register">
             <button>Register</button>
        </Link>

        <Link to="/login">
             <button>Login</button>
        </Link>

        <Link to="/edit-profile">
             <button>Edit Profile</button>
        </Link>

        <Link to="/admin-main">
            <button>Admin</button>
        </Link>

         <div class="container">
                 <div className="search-bar">
                 <input type="text" placeholder="Search for movies by title..."></input>
                 <button>Search</button>
             </div>
             <h2>Now Playing</h2>
                 <div className="movie-row">
                 {current_movies.map((movie, index) => (
        <MovieCard 
                  poster= {movie.trailer_picture}
                  title={movie.movie_title}
                  trailerLink={movie.trailer_link}
                  bookingLink="/BuyTickets"
                  detailsLink="/details/movie1"
        />
                 ))}
             </div>
             <h2>Coming Soon</h2>
             <div className="movie-row">
             {comingsoon_movies.map((movie, index) => (
        <MovieCard 
                  poster= {movie.trailer_picture}
                  title={movie.movie_title}
                  trailerLink={movie.trailer_link}
                  bookingLink="/BuyTickets"
                  detailsLink="/details/movie1"
        />
                 ))}
             </div>
         </div>
     </body>
       );
}

export default Home;