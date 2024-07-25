const Movie = require("../models/movie");
const Cinema = require("../models/cinema");

async function getResults(searchQuery, cityQuery) {
    try {
        const [moviesResult, cinemasResult] = await Promise.allSettled([
            Movie.find({ name: { $regex: new RegExp(searchQuery, "i") } }).sort({ ratedby: 1 }).limit(5),
            Cinema.find({ name: { $regex: new RegExp(searchQuery, "i") }, city: cityQuery }).sort({ ratedby: 1 }).limit(5)
        ]);
        // #FIXME- return only the data that is required for the frontend. currently returning the data 
        const movies = moviesResult.status === 'fulfilled' ? moviesResult.value : [];
        const cinemas = cinemasResult.status === 'fulfilled' ? cinemasResult.value : [];

        return { movies, cinemas };
    } catch (error) {
        throw new Error("Error fetching search results");
    }
}

module.exports = { getResults };

module.exports = { getResults };