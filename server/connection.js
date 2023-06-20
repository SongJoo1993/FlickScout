const mongoose = require('mongoose');
const movieURI = process.env.MONGODB_MOVIE_CONN_STRING;
const userURI = process.env.MONGODB_USER_CONN_STRING;

function makeNewConnection(uri) {

    // return new Promise((resolve, reject) => {
        // console.log(uri);
        const db = mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        db.once('error', (err) => {
            // reject(err);
            console.log("URI NOT connected")
            // reject(err);
        });
    
        db.once('open', () => {
            // User = db.model("users", userSchema);
            // resolve();
            console.log("URI connected")
            // resolve(db);
        });
    
        // return db;
    // })
}

const userConnection = makeNewConnection(userURI);
console.log("userConnection",userConnection);
const movieConnection = makeNewConnection(movieURI);

console.log(userConnection);

module.exports = {
    userConnection,
    movieConnection,
};
