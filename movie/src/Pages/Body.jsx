import React, { useEffect, useState, useContext, lazy, Suspense } from "react";
import axios from "axios";
import SearchContext from "../context/SearchContext";

import MovieCard from "../Components/MovieCard";
const Body = () => {
  const [topTen, setTopTen] = useState([]);
  const { search, setSearch, logged } = useContext(SearchContext);

  console.log(logged);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:2222/movies");
      setTopTen(res.data.films);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchSearchData = async (search) => {
    try {
      await axios
        .get(`http://localhost:2222/movies/?search=${search}`)
        .then((res) => {
          setTopTen(res.data.films);
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (search.length > 2) {
    fetchSearchData(search);
    setSearch("");
  }

  return (
    <>
      {topTen.length == 0 ? (
        <div className=" flex min-h-[110vh] py-[40vh] justify-center items-center">
          loading...
        </div>
      ) : (
        <div className="flex justify-center w-screen  px-5 lg:px-36 py-20 whitespace-nowrap gap-4  min-h-screen items-start flex-col">
          <h1 className="font-bold tracking-wide border-b-2 w-[90vw]  text-xl  text-[#00ff08]">
            Recomended Movies &#9733;
          </h1>

          <article className=" scroll-smooth    flex justify-start min flex-wrap  w-[100vw] mx-auto gap-x-11 sm:gap-x-10 gap-y-10 lg:gap-10 ">
            {topTen.map((movieDetails) => (
              <MovieCard movieDetails={movieDetails} key={movieDetails._id} />
            ))}
          </article>
        </div>
      )}
    </>
  );
};
export default Body;
