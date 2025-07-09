import React,  { useState, useEffect } from "react";
import './App.css'
function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.sampleapis.com/movies/comedy")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error in fetching", err);
        setLoading(false);
      });
  }, []);

  function HandleSearch() {
    setQuery(search);
  }

  const filterMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Movie App</h1>
      </div>
      <div className="Nav">
        <input
          type="text"
          placeholder="Search Movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={HandleSearch}>Search</button>
      </div>
      <div className="grid">
        {loading ? (
          <div>Loading movies.............</div>
        ) : filterMovies.length > 0 ? (
          <div className="grid">
            {filterMovies.map((movie, index) => (
              <div key={index}>
                <img src={movie.posterURL} alt={movie.title} />
                <h3>
                  {movie.title} | {movie.rating || "N/A"}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div>No movie found</div>
        )}
      </div>
    </>
  );
}

export default App;
