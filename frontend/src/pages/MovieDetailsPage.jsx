import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, UserMoviesContext } from "../context/features";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Button from "../components/ui/Button";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const { isAuthenticated } = useContext(AuthContext);
  const { addToWatchList, addToFavorites, isInWatchList, isInFavorites } =
    useContext(UserMoviesContext);
  const [addToWatchlistLoading, setAddToWatchlistLoading] = useState(false);
  const [addToFavouritesLoading, setAddToFavouritesLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(detailsUrl);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleAddToWatchlist = async () => {
    setAddToWatchlistLoading(true)
    if (!isAuthenticated) {
      toast.error("Please log in to add movies to your watchlist.");
      navigate("/login");
      return;
    }
    await addToWatchList(id);
    setAddToWatchlistLoading(false);
  };

  const handleAddToFavourites = async() => {
    setAddToFavouritesLoading(true);
    if (!isAuthenticated) {
      toast.error("Please log in to add movies to your favourites.");
      navigate("/login");
      return;
    }
    await addToFavorites(id);
    setAddToFavouritesLoading(false);
  };

const inWatchList = isInWatchList(id);
const inFavorites = isInFavorites(id);

  return (
    <>
      {loading ? (
        <div className="flex pt-25 text-white justify-center items-center h-64">
          <Loader />
        </div>
      ) : !loading && !movie ? (
        <div className="flex pt-25 text-white justify-center items-center h-64">
          Movie not found.
        </div>
      ) : (
        <div className="max-w-4xl text-white mx-auto p-4 flex flex-col md:flex-row gap-8 pt-25">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-72 rounded-lg shadow-lg object-cover"
          />
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-gray-600">{movie.overview}</p>
            <div className="flex items-center gap-4">
              <span className="text-yellow-500 font-bold">
                ⭐ {movie.vote_average}/10
              </span>
              <span className="text-gray-500">
                Released: {movie.release_date}
              </span>
            </div>
            <div>
              {movie.production_companies &&
                movie.production_companies.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">
                      Production Companies:
                    </h2>
                    <ul className="list-disc pl-5">
                      {movie.production_companies.map((company) => (
                        <li key={company.id} className="text-gray-600">
                          {company.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
            {/* {isAuthenticated && ( */}
              <div className="flex gap-4 mt-4">
                <Button
                  onClick={handleAddToWatchlist}
                  disabled={inWatchList}
                  className={`px-4 py-2 rounded disabled:bg-gray-300 text-gray-600 cursor-not-allowed font-semibold transition ${
                    inWatchList
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {addToWatchlistLoading && <Loader />}
                  {inWatchList ? "In Watchlist" : "Add to Watchlist"}
                </Button>
                <Button
                  onClick={handleAddToFavourites}
                  disabled={inFavorites}
                  className={`px-4 py-2 rounded disabled:bg-gray-300 text-gray-600 cursor-not-allowed font-semibold transition ${
                    inFavorites
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-pink-600 text-white hover:bg-pink-700"
                  }`}
                >
                  {addToFavouritesLoading && <Loader />}
                  {inFavorites ? "In Favourites" : "Add to Favourites"}
                </Button>
              </div>
            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
