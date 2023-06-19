const mongoose = require('mongoose');
const movieURI = process.env.MONGODB_MOVIE_CONN_STRING;
const userURI = process.env.MONGODB_USER_CONN_STRING;

function makeNewConnection(uri) {

    console.log(movieURI);
    console.log(userURI);

    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    db.once('error', (err) => {
        // reject(err);
        console.log("URI NOT connected")
    });

    db.once('connected', () => {
        // User = db.model("users", userSchema);
        // resolve();
        console.log("URI connected")
    });

    return db;
}

const userConnection = makeNewConnection(userURI);
const movieConnection = makeNewConnection(movieURI);

module.exports = {
    userConnection,
    movieConnection,
};
