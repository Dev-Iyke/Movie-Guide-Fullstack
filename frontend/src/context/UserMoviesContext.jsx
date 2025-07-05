import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { UserMoviesContext } from "./features";
// export const WatchListContext = createContext();

const UserMoviesProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const API_BASE = import.meta.env.VITE_APP_BACKEND_URL;
  const tokenData = localStorage.getItem("authToken");
  const token = tokenData ? JSON.parse(tokenData).value : null;

  // Fetch watchlist & favorites on mount
  useEffect(() => {
    if (token) {
      fetchWatchList();
      fetchFavorites();
    }
  }, [token]);

  const fetchWatchList = async () => {
    console.log(token)
    try {
      const res = await fetch(`${API_BASE}/watchlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      console.log(data)
      setWatchList(data.watchlist);
    } catch (err) {
      console.error("Error fetching watchlist:", err);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${API_BASE}/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      console.log(data)
      setFavorites(data.favorites);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  const addToWatchList = async (movieId) => {
    try {
      const res = await fetch(`${API_BASE}/watchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ movieId })
      });

      if (res.ok) {
        toast.success("Movie added to Watchlist!");
        fetchWatchList();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add to watchlist.");
      }
    } catch (err) {
      console.error("Error adding to watchlist:", err);
    }
  };

  const addToFavorites = async (movieId) => {
    try {
      const res = await fetch(`${API_BASE}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ movieId })
      });

      if (res.ok) {
        toast.success("Movie added to Favorites!");
        fetchFavorites();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add to favorites.");
      }
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  const removeFromWatchList = async (movieId) => {
  try {
    const res = await fetch(`${API_BASE}/watchlist/${movieId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      toast.success("Movie removed from Watchlist!");
      fetchWatchList();
    } else {
      const data = await res.json();
      toast.error(data.message || "Failed to remove from watchlist.");
    }
  } catch (err) {
    console.error("Error removing from watchlist:", err);
  }
};

const removeFromFavorites = async (movieId) => {
  try {
    const res = await fetch(`${API_BASE}/favorites/${movieId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      toast.success("Movie removed from Favorites!");
      fetchFavorites();
    } else {
      const data = await res.json();
      toast.error(data.message || "Failed to remove from favorites.");
    }
  } catch (err) {
    console.error("Error removing from favorites:", err);
  }
};

const isInWatchList = (movieId) => {
  return watchList.some(item => item.movieId == movieId);
};

const isInFavorites = (movieId) => {
  return favorites.some(item => item.movieId == movieId);
};

  return (
    <UserMoviesContext.Provider
      value={{
        watchList,
        favorites,
        addToWatchList,
        addToFavorites,
        removeFromWatchList,
        removeFromFavorites,
        isInWatchList,
        isInFavorites,
      }}
    >
      {children}
    </UserMoviesContext.Provider>
  );
};

export default UserMoviesProvider;
