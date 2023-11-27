const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { emit } = require("nodemon");

const movieShema = new Schema({
  title: {
    type: String,
    required: true,
  },
  poster: String,
  genre: {
    type: [
      {
        type: String,
        enum: [
          "Drama",
          "Crime",
          "Biography",
          "History",
          "Action",
          "Adventure",
          "Western",
          "Romance",
          "Sci-Fi",
          "Animation",
          "Mystery",
          "Family",
          "Fantasy",
          "Thriller",
          "War",
          "Horror",
          "Music",
          "Comedy",
          "Film-Noir",
          "Musical",
        ],
        message: "{VALUE} is not a valid genre.",
      },
    ],
  },
  description: String,
  rating: String,
  rank: Number,
  year: Number,
  views: {
    type: Number,
    default: 0,
  },
});

const Movie = mongoose.model("movies", movieShema);
module.exports = { Movie };
