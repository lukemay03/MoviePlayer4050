import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import MovieDetailsCard from './components/MovieDetailsCard'

function Home() {
    const [currentMovies, setCurrentMovie] = useState([]);
    const [comingSoonMovies, setComingSoonMovie] = useState([]);
    
    //state variables to get searched term and array to hold filetered movies by search
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filterQuery, setFilterQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);   
    const [filteredComingSoon, setFilteredComingSoon] = useState([])

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

  
  const handleFilter = (e) => {
    const filtered = currentMovies.filter(movie => 
      movie.category && movie.category.toLowerCase() === filterQuery.toLowerCase()
    );
    const filteredcoming = comingSoonMovies.filter(movie => 
        movie.category && movie.category.toLowerCase() === filterQuery.toLowerCase() 
      );
    setFilteredData(filtered);
    setFilteredComingSoon(filteredcoming);
  };

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

    const openModal = async (movie) => {
      const movieTitle = movie.movie_title;
        try {
            const link = 'http://localhost:3001/movie/details?string=' + encodeURIComponent(movieTitle);
            const response = await fetch(link);
            //parse response
            const movie_details =  await response.json();

            if (!response.ok) {
                console.log('An error occurred', response.statusText);
            } else {
                setSelectedMovie(movie_details[0]);
                console.log("Movie: ", movie_details[0]);
                console.log("movie rating: ", movie_details[0].movie_rating);
                console.log("movie cast: ", movie_details[0].cast);
                setShowModal(true);
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setShowModal(false);
    };

    return (
        <body>
        <Header></Header>

         <div className="container">
                 <div className="search-bar">
                 <input type="text" placeholder="Search for movies by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}></input>
                 <button onClick={handleSearch}>Search</button>



                <select 
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}>
                    <option value="">Filter by Genre</option>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="drama">Drama</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="horror">Horror</option>
                    <option value="musical">Musical</option>
                    <option value="Science Fiction">Sci-Fi</option>
                    <option value="Science Fiction">Sci-Fi</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="comedy">Comedy</option>
                </select>
                <button onClick={handleFilter}>Filter</button>
                 </div>
                 

            

             <h1>Now Playing</h1>
                 <div className="movie-row">
                 {filteredData.map((movie, index) => (
        <MovieCard 
                  key={index}
                  poster= {movie.trailer_picture}
                  title={movie.movie_title}
                  trailerLink={movie.trailer_link}
                  onDetailsClick={() => openModal(movie)}
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
                  onDetailsClick={() => openModal(movie)}
        />
                 ))}
             </div>
             {showModal && selectedMovie && (
                 <MovieDetailsCard
                     title={selectedMovie.movie_title}
                     details={selectedMovie.synopsis}
                     cast={selectedMovie.cast}
                     category={selectedMovie.category}
                     director={selectedMovie.director}
                     producer={selectedMovie.producer}
                     rating={selectedMovie.movie_rating}
                     closeModal={closeModal}
                 />
             )}
         </div>
        </body>
       );
    
}

export default Home;
