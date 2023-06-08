// Simple API Setup
const express = require('express');
const app = express();
const people = require('./MOCK_DATA.json');
const cors = require("cors");
require('dotenv').config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
const HTTP_PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Get tester
app.get('/', (req, res) => {
    res.json({message: "API listening"});
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
        console.log(result);
        res.json(result);
    }catch(err){
        res.status(404).json({message: "ERR!"});
    }
});

// Get movies using getAllMoviesByTitle
// To Be Worked
// app.get('/api/movies/title', async (req, res) => {
//     const {page, perPage} = req.query;
//     try{
//         let result = await db.getAllMoviesByTitle(page, perPage);
//         result.forEach(r => console.log(r.title));
//         res.json(result);
//     }catch(err){
//         res.status(404).json({message: "ERR!"});
//     }
// });

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
db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    // Tell the app to start listening for requests
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch(err => {
    console.log(err);
})