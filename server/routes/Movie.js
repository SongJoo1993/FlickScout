const express = require("express");
const passport = require("passport");
const router = express.Router();

const userRoutes = (db, passport) => {
  // Get movies
  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { page, perPage, title } = req.query;
      try {
        let result = await db.getAllMovies(page, perPage, title);
        res.json(result);
      } catch (err) {
        res.status(404).json({ message: "ERR!" });
      }
    },
  );

  // Get the result of Advanced Search
  router.get("/search", async (req, res) => {
    try {
      let result = await db.getSearchedMovies(req.query);
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: "ERR!" });
    }
  });

  // Add a new movie
  router.post("/", async (req, res) => {
    try {
      const result = await db.addNewMovie(req.body);
      res.status(200).json(result);
      console.log("successfully added!");
    } catch (err) {
      res.status(404).json({ message: err });
    }
  });

  // Get a single movie
  router.get("/:id", async (req, res) => {
    try {
      let result = await db.getMovieById(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err });
    }
  });

  // Update a movie
  router.put("/:id", (req, res) => {
    db.updateMovieById(req.body, req.params.id)
      .then((data) => {
        // console.log("data in PUT req: ",data)
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  });

  // Delete a movie
  router.delete("/:id", (req, res) => {
    db.deleteMovieById(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  });

  return router;
};

module.exports = userRoutes;
