import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import MovieDetailsCard from './components/MovieDetailsCard';

function Home() {
    const [currentMovies, setCurrentMovie] = useState([]);
    const [comingSoonMovies, setComingSoonMovie] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filteredComingSoon, setFilteredComingSoon] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showtimes, setShowtimes] = useState([]); 

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
            movie.movie_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (movie.category && movie.category.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        const filteredComing = comingSoonMovies.filter(movie =>
            movie.movie_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (movie.category && movie.category.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        setFilteredData(filtered);
        setFilteredComingSoon(filteredComing);
    };

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

    useEffect(() => {
        handleFilter();
    }, [filterQuery]);

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const openModal = async (movie) => {
        const movieTitle = movie.movie_title;
        try {
            //fetch movie details
            const detailsResponse = await fetch(`http://localhost:3001/movie/details?string=${encodeURIComponent(movieTitle)}`);
            const movieDetails = await detailsResponse.json();
            if (!detailsResponse.ok) throw new Error('Failed to fetch movie details.');

            setSelectedMovie(movieDetails[0]);

            //fetch showtimes
            const showtimesResponse = await fetch(`http://localhost:3001/api/movies/${movieTitle}/showtimes`);
            const showtimesData = await showtimesResponse.json();
            if (!showtimesResponse.ok) throw new Error('Failed to fetch showtimes.');

            setShowtimes(showtimesData.showtimes);

            //open modal
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching modal data:', error.message);
        }
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setShowModal(false);
        setShowtimes([]); 
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredData(currentMovies);
        setFilteredComingSoon(comingSoonMovies);
    };

    return (
        <body>
            <Header />

            <div className="container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for movies by title or genre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={clearSearch}>Clear Search</button>
                </div>

                <div className="filter-div">
                    <select
                        className="select-filter"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                    >
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
                            poster={movie.trailer_picture}
                            title={movie.movie_title}
                            trailerLink={movie.trailer_link}
                            onDetailsClick={() => openModal(movie)}
                            rating={movie.movie_rating}
                        />
                    ))}
                </div>

                <h1>Coming Soon</h1>
                <div className="movie-row">
                    {filteredComingSoon.map((movie, index) => (
                        <MovieCard
                            key={index}
                            poster={movie.trailer_picture}
                            title={movie.movie_title}
                            trailerLink={movie.trailer_link}
                            onDetailsClick={() => openModal(movie)}
                            rating={movie.movie_rating}
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
                        showtimes={showtimes} 
                        closeModal={closeModal}
                    />
                )}
            </div>
        </body>
    );
}

export default Home;

