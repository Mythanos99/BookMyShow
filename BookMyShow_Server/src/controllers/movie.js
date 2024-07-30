const movie_service = require('../services/movie');

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
        console.log(filters);
        const movies = await movie_service.getFilteredResult(filters);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllMovies,getFilteredMovies };