import React from "react";
import { useNavigate } from "react-router-dom";
import Poster from "./Poster";
const MovieCard = ({ movieDetails }) => {
  const navigate = useNavigate();
  const handleClick = (movieDetails) => (e) => {
    e.preventDefault();
    navigate(`/movie/${movieDetails._id}`);
  };
  return (
    <a
      className={`movie-card flex flex-col  cursor-pointer justify-start items-start gap-0 w-36 lg:w-44 xl:w-48 `}
      onClick={handleClick(movieDetails)}
    >
      <Poster image={movieDetails.large_cover_image} />
      <p className="movie-name overflow-hidden px-1 whitespace-nowrap max-w-full overflow-ellipsis  tracking-wide text-base hover:opacity-75 transition ">
        {movieDetails.title}
      </p>
      <p className="text-sm tracking-wide text-stone-400 transition hover:opacity-60 font-light px-1 truncate">
        {movieDetails.year}
      </p>
    </a>
  );
};

export default MovieCard;
