import logo from './logo.svg';
import './App.css';

function App() {
  return (
   <body>
    <header>
        <h1>Cinema E-Booking System</h1>
    </header>
    
    <div class="container">
            <div class="search-bar">
            <input type="text" placeholder="Search for movies by title..."></input>
            <button>Search</button>
        </div>
    
            <div class="movie-category">
            <h2>Currently Running</h2>
            <div class="movie">
                <iframe src="https://www.youtube.com/embed/sampleTrailer1" title="Movie Trailer"></iframe>
                <h3>Movie Title 1</h3>
                <p>Release Date: June 2024</p>
            </div>
            <div class="movie">
                <iframe src="https://www.youtube.com/embed/sampleTrailer2" title="Movie Trailer"></iframe>
                <h3>Movie Title 2</h3>
                <p>Release Date: May 2024</p>
            </div>
        </div>
    
        <div class="movie-category">
            <h2>Coming Soon</h2>
            <div class="movie">
                <iframe src="https://www.youtube.com/embed/sampleTrailer3" title="Movie Trailer"></iframe>
                <h3>Movie Title 3</h3>
                <p>Release Date: December 2024</p>
            </div>
            <div class="movie">
                <iframe src="https://www.youtube.com/embed/sampleTrailer4" title="Movie Trailer"></iframe>
                <h3>Movie Title 4</h3>
                <p>Release Date: November 2024</p>
            </div>
        </div>
    </div>
</body>
  );
}

export default App;
