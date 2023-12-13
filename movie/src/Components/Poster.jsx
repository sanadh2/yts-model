import React from "react";

const Poster = ({ image }) => {
  return (
    <img
      src={image}
      alt=""
      className="movie-poster object-contain border-[4px] rounded hover:border-[#00ff08]  border-white   transition  "
    />
  );
};

export default Poster;
