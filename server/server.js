// Simple API Setup
require('dotenv').config();
const express = require('express');
const app = express();
const people = require('./MOCK_DATA.json');
const cors = require("cors");
const mongoose = require("mongoose");
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
const HTTP_PORT = process.env.PORT || 8080;
const movie = process.env.MONGODB_MOVIE_CONN_STRING;
const user = process.env.MONGODB_USER_CONN_STRING;
const {userModel, movieModel} = require('./models')

// Middlewares
app.use(cors());
app.use(express.json());

// Get tester
app.get('/', (req, res) => {
    res.json({message: "API listening"});
});

app.get('/users', async (req, res) => {
    const users = await userModel.find({});

    res.json(users);
});

app.get('/movie', async (req, res) => {
    const movies = await movieModel.find({});

    res.json(movies);
});


// Add a new movie
app.post('/api/movies', async (req,res) => {
    try {
        const result = await db.addNewMovie(req.body);
        res.status(200).json(result);
    } catch(err) {
        res.status(404).json({message: err});
    }
})

// Get movies
app.get('/api/movies', async (req, res) => {
    const {page, perPage, title} = req.query;
    try{
        let result = await db.getAllMovies(page, perPage, title);
        res.json(result);
    }catch(err){
        res.status(404).json({message: "ERR!"});
    }
});

// Get the result of Advanced Search
app.get("/api/search", async (req,res) => {
    // console.log(req.query);
    try{
        let result = await db.getSearchedMovies(req.query);
        res.json(result);
    }catch(err){
        res.status(404).json({message: "ERR!"});
    }
}); 

// Get a single movie
app.get("/api/movies/:id", async (req,res) => {
    try{
        let result = await db.getMovieById(req.params.id);
        res.json(result);
    }catch(err){
        res.status(404).json({message: err});
    }
}); 

// Update a movie
app.put("/api/movies/:id", (req,res) => {
    db.updateMovieById(req.body, req.params.id).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).json({message: err});
    })
}); 

// Delete a movie
app.delete("/api/movies/:id", (req,res) => {
    db.deleteMovieById(req.params.id).then( () => {
        res.status(204).end();
    }).catch( err => {
        res.status(404).json({message: err});
    })
});

// DB initializer
// db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
//     // Tell the app to start listening for requests
//     app.listen(HTTP_PORT, () => {
//         console.log(`server listening on: ${HTTP_PORT}`);
//     });
// }).catch(err => {
//     console.log(err);
// })

// const connectDBs = (movieURI, userURI) => {
//     try {
//         const qrCodeDb = mongoose.createConnection(movieURI, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         })
//         const userDB = mongoose.createConnection(userURI, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         })
//         return { qrCodeDb, userDB }
//     }
//     catch (error) {
//         console.error(`Error:${error.message}`)
//         process.exit(1)
//     }

//     return new Promise((resolve, reject) => {
//         const qrCodeDb = mongoose.createConnection(movieURI, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         });
//         const userDB = mongoose.createConnection(userURI, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         });
        
//         return { qrCodeDb, userDB }

//         db.once('error', (err) => {
//           reject(err);
//         });
  
//         db.once('open', () => {
//           this.Movie = db.model("movies", movieSchema);
//           resolve();
//         });
//     });
// }

// connectDBs(movie,user).then(() => {    // Tell the app to start listening for requests
//     app.listen(HTTP_PORT, () => {
//         console.log(`server listening on: ${HTTP_PORT}`);
//     });
// }).catch(err => {
//     console.log(err);
// })

app.listen(HTTP_PORT, () => console.log(`App listening at http://localhost:${HTTP_PORT}`));