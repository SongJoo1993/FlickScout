const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userRoutes = (db, jwtOptions) => {
  // Register a new user
  router.post("/register", (req, res) => {
    console.log(req.body);
    db
      .registerUser(req.body)
      .then(user => {
        res.json(user);
      })
      .catch((error) => {
        res.status(404).json({ "message": error.message });
      });
  });

  // User Log-in
  router.post("/login", (req, res) => {
    db
      .checkUser(req.body)
      .then((user) => {

      let payload = { 
          _id: user._id,
          userName: user.userName,
          fullName: user.fullName,
          role: user.role,
          favourites: user.favourites,
          history: user.history
      };
      
      let token = jwt.sign(payload, jwtOptions.secretOrKey);

      res.json({"user": user, "token": token});
      })
      .catch((error) => {
        res.status(404).json({ "message": error.message });
      });
  });

  return router;
};

module.exports = userRoutes;
