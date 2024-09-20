import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header from './components/Header';
import MovieCard from './components/MovieCard';

function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await fetch('http://localhost:3001/movie/trailers');
                const data = await response.json();
                setData(data);
                setFilteredData(data);
                console.log(typeof(data)); // Check data type
            } catch (error) {
                console.error('Error fetching trailers:', error);
            }
        };
    
        fetchTrailers();
    }, []);
    const firstMovie = data[0];
    //const firstMovieTitle = firstMovie ? firstMovie.movie_title : 'Loading...';
    //const firstMovieTrailer = firstMovie ? firstMovie.trailer_link : '';

    //state variables to get searched term and array to hold filetered movies by search
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = () => {
    const filtered = data.filter(movie => 
      movie.movie_title.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredData(filtered); 
  };

    return (
        <body>
        <Header></Header>
        <Link to="/register"><button>Register</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/edit-profile"><button>Edit Profile</button></Link>
        <Link to="/admin-main"><button>Admin</button></Link>

         <div class="container">
                 <div className="search-bar">
                 <input type="text" placeholder="Search for movies by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}></input>
                 <button onClick={handleSearch}>Search</button>
             </div>

             <h2>Now Playing</h2>
                 <div className="movie-row">
                 {filteredData.map((movie, index) => (
        <MovieCard 
                  key={index}
                  poster= {movie.trailer_picture}
                  title={movie.movie_title}
                  trailerLink={movie.trailer_link}
                  bookingLink="/ticket-select"
                  detailsLink="/details/movie1"
        />
                 ))}
             </div>
             
                    
             <h2>Coming Soon</h2>
                 <div className="movie-row">
                 {data.map((movie, index) => (
        <MovieCard 
                  poster= {movie.trailer_picture}
                  title={movie.movie_title}
                  trailerLink={movie.trailer_link}
                  bookingLink="/ticket-select"
                  detailsLink="/details/movie1"
        />
                 ))}
             </div>
             
    
         </div>
     </body>
       );
}

export default Home;