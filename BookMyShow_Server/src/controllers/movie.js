const movie_service = require('../services/movie');
const upload = require("../utils/imgUpload");

async function getAllMovies(req, res) {
    res.setHeader('Content-Type', 'application/json');

    try {
        const movies = await movie_service.getAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error. Could Not fetch Movies" });
    }
}
async function getFilteredMovies(req, res) {
    try {
        const filters = req.query;
        const movies = await movie_service.getFilteredResult(filters);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getMovieById(req, res) {
    try {
        const movie = await movie_service.getById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getUpcomingMovies(req, res) {
    try {
        const filters = req.query;
        const movies = await movie_service.getUpcoming(filters);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getMovieFilters(req, res) {
    try {
        var location=req.query.location;
        const filters = await movie_service.getFilters(location);
        res.status(200).json(filters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function addMovie(req, res) {
    upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
    
        try {
          const movieData = {
            ...req.body,
            image_url: req.file ? req.file.path : ''
          };
    
          const newMovie = await movie_service.addMovie(movieData);
          return res.status(201).json(newMovie);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      });
}
module.exports = { getAllMovies,getFilteredMovies ,getMovieById,getUpcomingMovies,getMovieFilters,addMovie};

// .#FIXME- res.set header not added to all. Maintain code consistentcy.