const express = require("express");
const { MovieModel } = require("../model/moviemodel");
const { auth } = require("../middleware/auth.middleware");
const { rateLimiter } = require("../middleware/rateLimiter.middleware");

const movieRouter = express.Router();
movieRouter.use(rateLimiter);

movieRouter.post("/add", auth, async (req, res) => {
  try {
    const movie = new MovieModel(req.body);
    await movie.save();
    res.status(200).send({ msg: "A new movie has been added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

movieRouter.get("/", auth, async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

movieRouter.get("/:id",auth, async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await MovieModel.findOne({ _id: id });
    res.status(200).send(movie);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

movieRouter.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await MovieModel.findOne({ _id: id });
    if (!movie) {
      return res.status(404).send({ msg: "movie not found" });
    }
    await MovieModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Movie has been updated" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

movieRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await MovieModel.findOne({ _id: id });
    if (!movie) {
      return res.status(404).send({ msg: "movie not found" });
    }
    await MovieModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Movie has been deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  movieRouter,
};
