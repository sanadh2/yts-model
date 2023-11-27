import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import SearchContext from "../context/SearchContext";

const MovieDetails = () => {
  const { movieID } = useParams();
  const navigate = useNavigate();
  const { logged } = useContext(SearchContext);
  const [edit, setEdit] = useState(false);
  const [Movie, SetMovie] = useState({});
  const ref = useRef(null);
  useEffect(() => {
    const movieDetails = async () => {
      ref.current.continuousStart();
      await axios
        .get(`http://localhost:2222/movies/${movieID}`)
        .then((res) => {
          SetMovie(res.data.movie);
          ref.current.complete();
        })
        .catch((err) => console.error(err));
    };
    movieDetails();
  }, [movieID]);
  useEffect(() => {}, [Movie]);

  const Edit = () => {
    return (
      <>
        {logged ? (
          <></>
        ) : (
          <div className="fixed left-0 top-0 gap-10 h-screen w-screen  text-white font-mono flex backdrop-blur-xl flex-col justify-center items-center">
            <p>
              You have to be
              <span
                className=" underline mx-1 cursor-pointer"
                onClick={() => navigate(`/login`)}
              >
                logged in
              </span>
              to edit
            </p>
            <button
              type="button"
              className="bg-red-500 px-2 py-1"
              onClick={() => setEdit(false)}
            >
              Close
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <LoadingBar color="#ffffff" ref={ref} />
      <div className=" min-h-screen flex flex-col items-center gap-10">
        {Object.keys(movieID).length == 0 ? (
          <></>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-center">{Movie.title}</h1>
            <img src={Movie.poster} alt="" className="w-[12vw]" />
            <p className="text-xl px-10 font-bold">Plot: </p>
            <p className="text-xl px-10">{Movie.description}</p>
            <button
              type="button"
              className="bg-green-500 px-2 py-1"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            {edit ? <Edit /> : <></>}
          </>
        )}
      </div>
    </>
  );
};

export default MovieDetails;
