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

    //now handles genres as well as by title
    const handleSearch = () => {
      const filtered = currentMovies.filter(movie => 
        movie.movie_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (movie.category && movie.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    
      const filteredcoming = comingSoonMovies.filter(movie => 
        movie.movie_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (movie.category && movie.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    
      setFilteredData(filtered);
      setFilteredComingSoon(filteredcoming);
    };
    

    //using includes to filter movies with multiple genres 
    //clicking filter by genre resets filter now 
    const handleFilter = () => {
    if (!filterQuery || filterQuery === "Filter by Genre") {
      setFilteredData(currentMovies); 
      setFilteredComingSoon(comingSoonMovies); 
      return;
    }
  
    const filtered = currentMovies.filter(movie => 
      movie.category && movie.category.toLowerCase().includes(filterQuery.toLowerCase())
    );
    const filteredComing = comingSoonMovies.filter(movie => 
      movie.category && movie.category.toLowerCase().includes(filterQuery.toLowerCase())
    );
  
    setFilteredData(filtered);
    setFilteredComingSoon(filteredComing);
  };
  
  //apply the filter whenever we select, removing filter button
  useEffect(() => {
    handleFilter();
  }, [filterQuery]);

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

    //clear search and reset filtered data
  const clearSearch = () => {
    setSearchQuery(''); 
    setFilteredData(currentMovies); 
    setFilteredComingSoon(comingSoonMovies); 
  };

    return (
        <body>
        <Header></Header>

         <div className="container">
                 <div className="search-bar">
                 <input type="text" placeholder="Search for movies by title or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}></input>
                 <button onClick={handleSearch}>Search</button>
                 <button onClick={clearSearch}>Clear Search</button> 
                 </div>
                 
        <div className="filter-div">
            <select 
            className="select-filter" 
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
            </select>
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
