const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { emit } = require("nodemon");

const movieShema = new Schema({
  title: {
    type: String,
  },
  title_english: {
    type: String,
  },
  title_long: {
    type: String,
  },

  year: {
    type: Number,
  },
  rating: { type: Number, required: true },
  runtime: {
    type: Number,
  },
  genres: {
    type: Array,
  },
  summary: {
    type: String,
  },
  language: {
    type: String,
  },
  background_image: {
    type: String,
  },
  background_image_original: {
    type: String,
  },
  small_cover_image: {
    type: String,
  },
  medium_cover_image: {
    type: String,
  },
  large_cover_image: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
    required: false,
  },
});

const Movie = mongoose.model("movies", movieShema);
module.exports = { Movie };
