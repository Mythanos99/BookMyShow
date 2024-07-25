
const Movie = require("../models/movie");
async function getAll() {
    try {
        const movies = await Movie.find({});
        return movies;
    } catch (error) {
        throw new Error("Error fetching movies");
    }
}

module.exports = { getAll };