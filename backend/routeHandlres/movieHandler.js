const { movies } = require("../movies");
const { Movie } = require("../Model/movies");
const { asyncWrapper } = require("../middlewares/async");

const moviezz = require("../../movies.json");
const { query } = require("express");

const getMovie = asyncWrapper(async (req, res, next) => {
  const { movieID } = req.params;

  const movie = await Movie.findByIdAndUpdate(
    movieID,
    { $inc: { views: 1 } }, // Increment views by 1
    { new: true }
  );
  if (!movie)
    return res.status(404).json({ success: false, msg: "Movie Not Found " });
  res.status(200).json({ success: true, movie });
});

const getMovies = asyncWrapper(async (req, res, next) => {
  const { search, skip, year, genre, trending } = req.query;
  let queryObject = {};

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }
  let filtering = Movie.find(queryObject);
  if (year) {
    queryObject.year = Number(year);
  }
  if (genre) {
    queryObject.genre = { $in: [genre] };
  }
  const limit = Number(req.query.limit) || 10;

  if (limit) {
    filtering = filtering.limit(limit);
  }
  if (trending) {
    filtering.sort({ views: -1 });
  }

  const films = await filtering;
  res.status(200).json({ films, nbh: films.length });
});

const deleteall = asyncWrapper(async (req, res, next) => {
  const films = await Movie.deleteMany({});
  res.status(200).json({ films, nbh: films.length });
});

const addMovies = asyncWrapper(async (req, res, next) => {
  // console.log(moviezz);
  const films = await Movie.create(moviezz);
  res.status(200).json({ films, nbh: films.length });
});

module.exports = { getMovie, getMovies, deleteall, addMovies };
