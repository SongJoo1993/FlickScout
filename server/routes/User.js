const express = require('express');
const app = express();
const MoviesDB = require("../modules/moviesDB");
const db = new MoviesDB();

// Register a new user!
app.post("/register", (req, res) => {
    console.log(db);
    db
    .registerUser(req.body)
    .then(user => {
        res.json(user);
    })
    .catch((error)=> {
        res.json({ "message": error.message });
    })
});

// User Log-in
app.post("/login", (req, res) => {
    db.checkUser(req.body)
    .then((user) => {
        res.json(user);
    })
    .catch(error =>  {
        res.json({"message": error.message});
    })

});

module.exports = app;