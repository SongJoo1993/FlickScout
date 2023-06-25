// Try to modulize user related functions later!
// Importing MovieDB doesn't work.
// const MoviesDB = require("./moviesDB");
// const db = new MoviesDB();

// const User = db.User;

// module.exports.getUserById = async function(userData) {
//     console.log(db);
//     try {
//       const user = await User.findOne({ userName: userData.userName })
//       .exec();
//       return user;
//     } catch (err) {
//       console.log("Unable to find user " + userData.userName);
//       return null;
//     }
// }