const express = require('express');
const router = express.Router();

const userRoutes = (db) => {
  // Register a new user
  router.post("/register", (req, res) => {
    db
      .registerUser(req.body)
      .then(user => {
        res.json(user);
      })
      .catch((error) => {
        res.json({ "message": error.message });
      });
  });

  // User Log-in
  router.post("/login", (req, res) => {
    db
      .checkUser(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        res.json({ "message": error.message });
      });
  });

  return router;
};

module.exports = userRoutes;
