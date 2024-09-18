import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header from './components/Header';

function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await fetch('http://localhost:3001/movie/trailers');
                const data = await response.json();
                setData(data);
                console.log(typeof(data)); // Check data type
            } catch (error) {
                console.error('Error fetching trailers:', error);
            }
        };
    
        fetchTrailers();
    }, []);
    const firstMovie = data[0];
    const firstMovieTitle = firstMovie ? firstMovie.movie_title : 'Loading...';
    const firstMovieTrailer = firstMovie ? firstMovie.trailer_link : '';
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
         
                 <div className="movie-category">
                 <h2>Now Playing</h2>
                 <div className="movie">
                 <iframe width="560" height="315" src={firstMovieTrailer}title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                     <h3>{String(firstMovieTitle)}</h3>
                     <p>Release Date: June 2024</p>
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