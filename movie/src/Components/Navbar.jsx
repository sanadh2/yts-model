import React, { useState, useContext, useEffect } from "react";
import SearchContext from "../context/SearchContext";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useRef } from "react";
import "./nav.css";

import homeSvg from "../svg/home.svg";
import trendingSvg from "../svg/trending.svg";
import browseSvg from "../svg/browse.svg";
import searchSvg from "../svg/search.svg";
import loginSvg from "../svg/login.svg";
const Navbar = () => {
  const { movie, setmovie, search, setSearch } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && searchInput) {
      ref.current.focus();
    }
  }, [ref, searchInput]);

  const submit = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
      navigate("/");
    }
  };
  const DesktopSearch = () => (
    <>
      <input
        type="text"
        placeholder="Search"
        className="border-2 border-[#05fc16] pl-3  text-white text-base lg:w-48 xl:w-60 bg-slate-800 lg:h-8  hidden lg:block"
        onChange={(e) => e.defaultPrevented()}
        onKeyDown={(e) => submit(e)}
      />
      {searchInput ? (
        <input
          type="text"
          className=" lg:hidden block border-[#05fc16] px-[1rem] text-lg text-white bg-slate-800 border   w-[40vw]"
          onBlur={() => setSearchInput(false)}
          placeholder="Search"
          onChange={(e) => (e) => e.defaultPrevented()}
          onKeyDown={(e) => submit(e)}
          ref={ref}
          id="message"
          name="message"
        />
      ) : (
        <p>
          <img
            src={searchSvg}
            alt="search"
            className="hoverimage lg:hidden block h-5 w-5 md:h-10 cursor-pointer"
            onClick={(e) => setSearchInput(true)}
          />
          <span className="hovername absolute z-[99] p-1 top-12 bg-slate-950 hidden transition-all  border">
            Search
          </span>
        </p>
      )}
    </>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 backdrop-blur   flex gap-3 justify-between  items-center shadow-sm shadow-white    text-white px-2 md:px-10 lg:px-6 xl:px-10 h-[8vh]">
        <h1 className="text-xl text-[#00ff08] ">My-Movies</h1>
        <div className="flex gap-2 w-[40vw] lg:w-4/6 xl:w-1/2 justify-around items-center">
          <DesktopSearch />

          <Link to="/" className="cursor-pointer relative">
            <img
              className={`hoverimage h-5 w-5 md:h-10 cursor-pointer ${
                searchInput ? "hidden" : "flex lg:hidden"
              }`}
              src={homeSvg}
              alt="home"
            />
            <p
              className={`hovername absolute z-[99] p-1 top-8 bg-slate-950 hidden transition-all  border 
              }`}
            >
              Home
            </p>
          </Link>

          <Link to="/trending" className="cursor-pointer relative">
            <img
              className={` hoverimage h-5 w-5 md:h-10 cursor-pointer ${
                searchInput ? "hidden" : "flex lg:hidden"
              }`}
              src={trendingSvg}
              alt="trending"
              onClick={() => navigate("/trending")}
            />
            <p className="hovername absolute z-[99] p-1 top-8 bg-slate-950 hidden transition-all  border">
              Trending
            </p>
          </Link>
          <Link to="/browse-movies" className="cursor-pointer relative">
            <img
              className={`hoverimage  h-5 w-5 md:h-10 cursor-pointer ${
                searchInput ? "hidden" : "flex lg:hidden"
              }`}
              src={browseSvg}
              alt="browse"
              onClick={() => navigate("/browse-movies")}
            />
            <p className="hovername absolute z-[99] top-8 p-1 bg-slate-950 hidden transition-all  border">
              browse
            </p>
          </Link>
          <Link to="/login" className="cursor-pointer relative">
            <img
              className={`hoverimage h-5 w-5 md:h-10 cursor-pointer ${
                searchInput ? "hidden" : "flex lg:hidden"
              }`}
              src={loginSvg}
              alt="login"
              onClick={() => navigate("/login")}
            />
            <p className="hovername absolute z-[99] top-8 p-1 right-2 bg-slate-950 hidden transition-all  border">
              Login
            </p>
          </Link>

          <div className=" lg:text-base lg:items-center gap-4  hidden lg:flex">
            <Link
              to="/"
              className={`cursor-pointer ${
                active == "home" ? "underline" : null
              }`}
              onClick={() => setActive("home")}
            >
              Home
            </Link>

            <p className="cursor-pointer">
              <Link
                to="/trending"
                className={`cursor-pointer ${
                  active == "trending" ? "underline" : null
                }`}
                onClick={() => setActive("trending")}
              >
                Trending
              </Link>
            </p>
            <p className=" leading-none cursor-pointer whitespace-nowrap">
              <Link
                to="/browse-movies"
                className={`cursor-pointer ${
                  active == "browse" ? "underline" : null
                }`}
                onClick={() => setActive("browse")}
              >
                Browse Movies
              </Link>
            </p>
          </div>

          <div className="lg:flex lg:text-base lg:items-center hidden gap-1">
            <Link
              to="/login"
              className={`cursor-pointer ${
                active == "login" ? "underline" : null
              }`}
              onClick={() => setActive("login")}
            >
              Login
            </Link>
            <p>|</p>
            <p className="cursor-pointer">
              <Link
                to="/signup"
                className={`cursor-pointer ${
                  active == "signup" ? "underline" : null
                }`}
                onClick={() => setActive("signup")}
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </nav>
      <div className="h-[8vh]"></div>
      <Outlet />
    </>
  );
};

export default Navbar;
