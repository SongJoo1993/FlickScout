const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const MoviesDB = require('./modules/moviesDB.js');
const db = new MoviesDB();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const HTTP_PORT = process.env.PORT || 8080;

// JSON Web Token Setup
let ExtractJwt = passportJWT.ExtractJwt,
  JwtStrategy = passportJWT.Strategy;

// Configure Strategy options
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const userRoute = require('./routes/User.js')(db, jwtOptions);
const movieRoute = require('./routes/Movie.js')(db, passport);

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);

  if (jwt_payload) {
    next(null, {
      _id: jwt_payload._id,
      userName: jwt_payload.userName,
      fullName: jwt_payload.fullName,
      role: jwt_payload.role,
      favourites: jwt_payload.favourites,
      history: jwt_payload.history,
    });
  } else {
    next(null, false);
  }
});

passport.use(strategy);

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/movies', movieRoute);
app.use(passport.initialize());

// Get tester
app.get('/', (req, res) => {
  res.json({ message: 'API listening' });
});

// DB initializer
db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    // Tell the app to start listening for requests
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
