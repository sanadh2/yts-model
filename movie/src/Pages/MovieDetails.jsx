import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import SearchContext from "../context/SearchContext";
import Poster from "../Components/Poster";

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

  const Edit = () => {
    return (
      <>
        {logged ? (
          <></>
        ) : (
          <div className="fixed left-0 top-0 gap-10 h-screen w-screen  text-white font-mono flex backdrop-blur-2xl flex-col justify-center items-center">
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
      <div
        style={{
          backgroundImage: `url(${Movie.background_image_original})`,
        }}
        className={`min-h-[92vh] flex bg-no-repeat bg-cover bg-gradient-to-r bg-center bg-blend-screen backdrop-blur-sm  flex-col items-start gap-10 "]`}
      >
        {Object.keys(movieID).length == 0 ? (
          <></>
        ) : (
          <div className="flex flex-col justify-center py-16 items-start  px-10">
            <div className=" flex justify-start gap-10">
              <div className="w-48">
                <Poster image={Movie.large_cover_image} />
              </div>
              <article className="flex flex-col ">
                <h1 className="text-4xl font-bold ">{Movie.title}</h1>
                <h2 className="pt-5">{Movie.year}</h2>
                <h3>{Movie.genres && Movie.genres.map((el) => el + " / ")}</h3>
              </article>
            </div>

            <p className="text-xl px-10 font-bold">Plot: </p>
            {/* <p className="text-xl px-10 font-light ">{Movie.summary}</p> */}
            <button
              type="button"
              className="bg-green-500 px-2 py-1"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            {edit ? <Edit /> : <></>}
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetails;

{
  /* 
background_image: "https://yts.mx/assets/images/movies/frankenstein_and_the_monster_from_hell_1974/background.jpg"
background_image_original: "https://yts.mx/assets/images/movies/frankenstein_and_the_monster_from_hell_1974/background.jpg"
genres: ['Horror', 'Sci-Fi']
language: "en"
large_cover_image:"https://yts.mx/assets/images/movies/frankenstein_and_the_monster_from_hell_1974/large-cover.jpg"
medium_cover_image:"https://yts.mx/assets/images/movies/frankenstein_and_the_monster_from_hell_1974/medium-cover.jpg"
rating:6.3
runtime:93
slug:"frankenstein-and-the-monster-from-hell-1974"
small_cover_image :"https://yts.mx/assets/images/movies/frankenstein_and_the_monster_from_hell_1974/small-cover.jpg"
summary: "Simon Helder (Shane Briant) spends his nights piecing together body parts from cadavers for his research but is brought before a judge and sentenced to 5 years in an insane asylum where he is tortured by the orderlies. Little does Helder know but Baron Frankenstein (Peter Cushing) has been hiding out in the asylum and when he discovers the young doctor he enlists him as an assistant to help in the tending of the medical needs of the other inmates but ultimately to help with the creation of a new monster he is bringing to life. The monster (David Prowse) is a compilation of body parts taken from the dying inmates in the asylum, many of whom Frankenstein euthanizes for his purpose. Helder is uneasy with the Barons utilizing of the inmates to further his research and tells the Baron his feelings, but the Baron confides in Helder a secret that is the cause of his lovely young assistant Sarah (Madeline Smith) a mute who is the daughter of the lecherous Asylum Director (John Stratton). As the experiments progress and the monster is created it becomes apparent that there is an incompatibility of body parts, driving the monster homicidally insane and aggressively vicious."
title: "Frankenstein and the Monster from Hell"
title_english :  "Frankenstein and the Monster from Hell"
title_long:"Frankenstein and the Monster from Hell (1974)"
views:69
year:1974
_id:"656cdfcdb2e11836968fdbec" */
}
