import React from "react";
import Navbar from "./Navbar";
import Body from "./Body";
import LogIn from "./LogIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trending from "./Trending";
import BrowseMovies from "./Browser";
import SignUp from "./SignUp";
import MovieDetails from "./MovieDetails";
const Home = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Body />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/trending" element={<Trending />} />
            <Route path={`/movie/:movieID`} element={<MovieDetails />} />
            <Route path="/browse-movies" element={<BrowseMovies />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default Home;
