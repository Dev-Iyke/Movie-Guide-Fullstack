import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
console.log(apiKey);
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(trendingUrl);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  //Search functionality
  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
          const response = await fetch(searchUrl);
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchSearchResults();
    } else {
      // If query is empty, reset to trending movies
      const fetchMovies = async () => {
        try {
          const response = await fetch(trendingUrl);
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovies();
    }
  }, [query]);

  console.log(movies);
  return (
    <div className="text-gray-200 flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl text-center font-semibold">Trending Movies</h1>

      <div className="w-full max-w-md mb-8">
        <input
          className="bg-gray-800 text-gray-200 p-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 w-full max-w-md"
          placeholder="Search for a movie..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p>{query}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
