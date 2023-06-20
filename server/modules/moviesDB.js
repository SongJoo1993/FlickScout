const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = class MoviesDB {
  constructor() {
    // We don't have a `Movie` object until initialize() is complete
    this.Movie = null;
  }

  // Pass the connection string to `initialize()`
  initialize(connectionString) {
    return new Promise((resolve, reject) => {
      const db = mongoose.createConnection(
        connectionString,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );

      db.once('error', (err) => {
        reject(err);
      });

      db.once('open', () => {
        this.Movie = db.model("movies", movieSchema);
        resolve();
      });
    });
  }

  async addNewMovie(data) {
    const newMovie = new this.Movie(data);
    await newMovie.save();
    return newMovie;
  }

  async getAllMovies(page, perPage, title) {
    // return this.Movie.distinct("countries");
    let findBy = title ? { title: { $regex: new RegExp(title, 'gi') } } : {};
    if (+page && +perPage) {
      const [pageData, total] = await Promise.all([
        this.Movie.find(findBy).sort({ year: +1 }).skip((page - 1) * +perPage).limit(+perPage).exec(),
        this.Movie.countDocuments(findBy),
      ]);
      return { pageData, total };
    }
    return Promise.reject(new Error('page and perPage query parameters must be valid numbers'));
  }

  // Get Movies from Advanced Search 
  async getSearchedMovies(query) {
    const {page} = query;
    const {perPage} = query;
    delete query.page;
    delete query.perPage;
    // console.log(page);
    // console.log(perPage);
    let finalQuery = {};
    finalQuery = this.searchQueryGen(query,finalQuery);
    // console.log(finalQuery);

    const [pageData, total] = await Promise.all([
      this.Movie.find(finalQuery).sort({ year: +1 }).skip((page - 1) * +perPage).limit(+perPage).exec(),
      this.Movie.countDocuments(finalQuery),
    ]);

    return { pageData, total };
  }

  searchQueryGen(query,finalQuery) {
    for(const props in query) {
      if(props === "genre") {
        query[props] = query[props].split(',');
        finalQuery.genres = query[props];
      } else if(props === "runTimeFrom" || props === "fromRate") {
        query[props] = query[props] * 1;
        query[props] = {$gte : query[props]};
        if(props === "runTimeFrom") {
          finalQuery.runtime = query[props];
        } 
        else if(props === "fromRate") {
          let keyName = "imdb.rating"; 
          finalQuery[keyName] = query[props];
        }
      } else if(props === "runTimeTo" || props === "toRate") {
        query[props] = query[props] * 1;
        query[props] = {$lte : query[props]};
        if(props === "runTimeTo") {
          Object.assign(finalQuery.runtime, query[props]);
        } 
        else if(props === "toRate") {
          let keyName = "imdb.rating"; 
          Object.assign(finalQuery[keyName], query[props]);         
        }
      } else if(typeof query[props] === "string" && !props.includes("Date")) {
        query[props] = { $regex: new RegExp(query[props], 'i') };
        finalQuery[`${props}`] = query[props];
      } else {
        query[props] = new Date(query[props]).toISOString();
        if(props === "fromDate") {
          query[props] = {$gte : (query[props])}
          finalQuery.released = query[props];
        } else {
          query[props] = {$lte : (query[props])}
          Object.assign(finalQuery.released, query[props]);
        }
      }
    }
    return finalQuery;
  }
  
  regexGenerator(str) {
    return str ? { str: { $regex: new RegExp(str, 'gi') } } : {};
  }

  getMovieById(id) {
    return this.Movie.findOne({ _id: id }).exec();
  }

  updateMovieById(data, id) {
    return this.Movie.updateOne({ _id: id }, { $set: data }).exec();
  }

  deleteMovieById(id) {
    return this.Movie.deleteOne({ _id: id }).exec();
  }
}
