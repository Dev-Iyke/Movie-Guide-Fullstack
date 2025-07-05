import React, { useContext } from "react";
import { UserMoviesContext } from "../../context/features";
import Button from "../ui/Button";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const UserMovieCard = ({movie, handleRemoval}) => {
  return (
    <div
      key={movie.id}
      className="bg-[#1a1a1a] flex justify-start gap-4 w-full rounded-lg p-3 hover:scale-105 transition-transform"
    >
      <div className="max-w-25 max-h-25 ">
        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg mb-3 h-full w-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-md font-semibold">{movie.title}</h3>
        <p className="font-light mb-1">{movie.tagline}</p>
        <Button
          onClick={handleRemoval}
          className="w-fit px-6 py-1! bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default UserMovieCard;
