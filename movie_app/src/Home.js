import React from 'react';
import {Link} from 'react-router-dom';
import Header from './components/Header';
import MovieCard from './components/MovieCard'

function Home() {
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
         
         <div class="container">
                 <div className="search-bar">
                 <input type="text" placeholder="Search for movies by title..."></input>
                 <button>Search</button>
             </div>
         
                 <div className="movie-category">
                 <h2>Now Playing</h2>
                 <div className="movie">
        <MovieCard 
                  poster="https://i.etsystatic.com/18242346/r/il/16aa5f/4580913355/il_1588xN.4580913355_oerg.jpg"
                  title="Pearl"
                  trailerLink="/trailer/movie1"
                  bookingLink="/BuyTickets"
                  detailsLink="/details/movie1"
        />
                 </div>
                 <div className="movie">
                     <iframe src="https://www.youtube.com/embed/sampleTrailer2" title="Movie Trailer"></iframe>
                     <h3>Movie Title 2</h3>
                     <p>Release Date: May 2024</p>
                 </div>
             </div>
         
             <div className="movie-category">
                 <h2>Coming Soon</h2>
                 <div className="movie">
                     <iframe src="https://www.youtube.com/embed/sampleTrailer3" title="Movie Trailer"></iframe>
                     <h3>Movie Title 3</h3>
                     <p>Release Date: December 2024</p>
                 </div>
                 <div className="movie">
                     <iframe src="https://www.youtube.com/embed/sampleTrailer4" title="Movie Trailer"></iframe>
                     <h3>Movie Title 4</h3>
                     <p>Release Date: November 2024</p>
                 </div>
             </div>
         </div>
     </body>
       );
}

export default Home;