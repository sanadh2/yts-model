const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const showShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  backdrop_path: String,
  genres: Array,
  original_title: String,
  overview: String,
  release_date: String,
  poster_path: String,
  contentType: String,
  trending: Boolean,
  rating: Number,
});

const Show = mongoose.model("shows", showShema);
module.exports = { Show };
