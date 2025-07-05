import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import { UserMoviesContext } from "../context/UserMoviesContext";
import { AuthContext, UserMoviesContext } from "../context/features";
import Button from "../components/ui/Button";
import UserMovieCard from "../components/home/UserMovieCard";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { watchList, favorites, removeFromWatchList, removeFromFavorites } = useContext(UserMoviesContext);

  const [watchlistDetails, setWatchlistDetails] = useState([]);
  const [favoritesDetails, setFavoritesDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(
        watchList.map(async (item) => {
          const res = await fetch(`https://api.themoviedb.org/3/movie/${item.movieId}?api_key=${apiKey}`);
          return await res.json();
        })
      );
      setWatchlistDetails(details);
    };
    fetchDetails();
  }, [watchList]);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(
        favorites.map(async (item) => {
          const res = await fetch(`https://api.themoviedb.org/3/movie/${item.movieId}?api_key=${apiKey}`);
          return await res.json();
        })
      );
      setFavoritesDetails(details);
    };
    fetchDetails();
  }, [favorites]);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">My Profile</h1>

      <div className="bg-[#111] p-4 md:p-6 rounded-xl">
        <Tabs>
          <TabList className="flex gap-4 mb-6 border-b border-gray-700 pb-2">
            <Tab className="cursor-pointer px-4 py-2 text-lg rounded-md hover:bg-[#222]">Watchlist</Tab>
            <Tab className="cursor-pointer px-4 py-2 text-lg rounded-md hover:bg-[#222]">Favorites</Tab>
            <Tab className="cursor-pointer px-4 py-2 text-lg rounded-md hover:bg-[#222]">Account</Tab>
          </TabList>

          {/* Watchlist */}
          <TabPanel>
            <div className="flex gap-6">
              {watchlistDetails.length === 0 && (
                <p className="text-center col-span-full text-gray-400">No movies in watchlist.</p>
              )}
              {watchlistDetails.map((movie) => (
                <UserMovieCard key={movie.id} movie={movie} handleRemoval={() => removeFromWatchList(movie.id)} />
              ))}
            </div>
          </TabPanel>

          {/* Favorites */}
          <TabPanel>
            <div className="flex gap-6">
              {favoritesDetails.length === 0 && (
                <p className="text-center col-span-full text-gray-400">No movies in favorites.</p>
              )}
              {favoritesDetails.map((movie) => (
                <UserMovieCard key={movie.id} movie={movie} handleRemoval={() => removeFromFavorites(movie.id)} />
              ))}
            </div>
          </TabPanel>

          {/* Account */}
          <TabPanel>
            <div className="bg-[#1a1a1a] p-6 rounded-lg max-w-md mx-auto text-lg space-y-4">
              <p><span className="font-semibold">firstName:</span> {user?.firstName}</p>
              <p><span className="font-semibold">lastName:</span> {user?.lastName}</p>
              <p><span className="font-semibold">Email:</span> {user?.email}</p>
              <p><span className="font-semibold">Member Since:</span> {new Date(user?.addedAt).toLocaleDateString()}</p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
