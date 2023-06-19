const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {userConnection, movieConnection} = require('./connection');

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    email: {
        type: String,
        required: true,
        unique: true,
        // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    history: [String],
    favourites: [String],
});

const movieSchema = new Schema({
    plot: String,
    genres: [String],
    runtime: Number,
    cast: [String],
    num_mflix_comments: Number,
    poster: String,
    title: String,
    fullplot: String,
    languages: [String],
    released: Date,
    directors: [String],
    rated: String,
    awards: {
      wins: Number,
      nominations: Number,
      text: String
    },
    lastupdated: Date,
    year: Number,
    imdb: {
      rating: Number,
      votes: Number,
      id: Number
    },
    countries: [String],
    type: String,
    tomatoes: {
      viewer: {
        rating: Number,
        numReviews: Number,
        meter: Number
      },
      dvd: Date,
      lastUpdated: Date
    }
  }
  );

const userModel = userConnection.model('users', userSchema);
const movieModel = movieConnection.model('movies', movieSchema);

module.exports = {
    userModel, movieModel
}