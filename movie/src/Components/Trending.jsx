import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Trending = () => {
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:2222/movies?trending=a");
      setTrending(res.data.films);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleClick = (movieDetails) => (e) => {
    e.preventDefault();
    navigate(`/movie/${movieDetails._id}`);
  };
  return (
    <>
      {trending.length == 0 ? (
        <div className=" flex min-h-[110vh] py-[40vh] justify-center items-center">
          {/* <BoltLoader
            className={"loaderbolt"}
            boltColor={"#6366F1"}
            backgroundBlurColor={"#E0E7FF"}
          /> */}
          loading
        </div>
      ) : (
        <article className="py-[15vh] min-h-screen px-5 lg:px-36 flex justify-start min flex-wrap text-xl w-[100vw] mx-auto gap-x-11 sm:gap-x-10 gap-y-10 lg:gap-10 ">
          {trending.map((movieDetails, index) => (
            <a
              className={`flex flex-col justify-start items-center gap-2 w-36 lg:w-44 xl:w-48    ${
                index >= trending.length - 2 ? " justify-self-start" : ""
              }`}
              key={movieDetails._id}
              onClick={handleClick(movieDetails)}
            >
              <img
                src={movieDetails.poster}
                alt=""
                className=" object-contain border-2 border-white   transition  "
              />
              <p className="text-sm">{movieDetails.title} </p>
            </a>
          ))}
        </article>
      )}
    </>
  );
};

export default Trending;
