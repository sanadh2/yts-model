const express = require("express");
const movieRouter = express.Router();

const {
  getMovie,
  getMovies,
  deleteall,
  addMovies,
  viewCounter,
} = require("../routeHandlres/movieHandler");

movieRouter.get("/", getMovies);
movieRouter.get("/:movieID", getMovie);
movieRouter.delete("/", deleteall);
movieRouter.post("/", addMovies);

module.exports = { movieRouter };
