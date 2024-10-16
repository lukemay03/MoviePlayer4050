import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header from './components/Header';
import MovieCard from './components/MovieCard';

function Home() {
    const [currentMovies, setCurrentMovie] = useState([]);
    const [comingSoonMovies, setComingSoonMovie] = useState([]);
    
    //state variables to get searched term and array to hold filetered movies by search
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredData, setFilteredData] = useState([]);   
    const [filteredComingSoon, setFilteredComingSoon] = useState([])

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:3001/movie/trailers'),
            fetch('http://localhost:3001/movie/comingsoon'),
        ])
        .then(([resCurrent, resComingMovie]) =>
            Promise.all([resCurrent.json(), resComingMovie.json()])
    )
        .then(([current, coming]) => {
            setCurrentMovie(current);
            setComingSoonMovie(coming);
            setFilteredData(shuffleArray(current));
            setFilteredComingSoon(shuffleArray(coming));
        });
    }, []);

    const handleSearch = () => {
    const filtered = currentMovies.filter(movie => 
      movie.movie_title.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    const filteredcoming = comingSoonMovies.filter(movie => 
        movie.movie_title.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    setFilteredData(filtered);
    setFilteredComingSoon(filteredcoming);
  };

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

    return (
        <body>
        <Header></Header>

         <div className="container">
                 <div className="search-bar">
                 <input type="text" placeholder="Search for movies by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}></input>
                 <button onClick={handleSearch}>Search</button>
                 </div>

            

             <h1>Now Playing</h1>
                 <div className="movie-row">
                 {filteredData.map((movie, index) => (
        <MovieCard 
                  key={index}
                  poster= {movie.trailer_picture}
                  title={movie.movie_title}
                  trailerLink={movie.trailer_link}
                  detailsLink="/details/movie1"
        />
                 ))}
             </div>
             <h1>Coming Soon</h1>
             <div className="movie-row">
             {filteredComingSoon.map((movie, index) => (
        <MovieCard 
                  poster= {movie.trailer_picture}
                  title={movie.movie_title}
                  trailerLink={movie.trailer_link}
                  detailsLink="/details/movie1"
        />
                 ))}
             </div>
             
    
         </div>
     </body>
       );
}

export default Home;
