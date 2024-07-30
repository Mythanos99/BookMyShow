
const Movie = require("../models/movie");
const Show = require("../models/show");
async function getAll() {
    try {
        const movies = await Movie.find({});
        return movies;
    } catch (error) {
        throw new Error("Error fetching movies");
    }
}

async function getFilteredResult(filters) {
    try {
        const query = {};

        if (filters.location) {
            query.city = filters.location;
        }

        if (filters.languages) {
            query.language = { $in: filters.languages.split('|') };
        }
        if(filters.format){
            query.format = { $in: filters.format.split('|') };
        }

        if(filters.genre){
            query.genre = { $in: filters.genre.split('|') };
        }
        const shows = await Show.aggregate([
            { $match: query },
            { $group: { _id: "$content_id", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        const movieIds = shows.map(show => show._id);
        const movies = await Movie.find({ _id: { $in: movieIds } });
        // #TODO- check if needed to return the movie or should i store the duplicated data inside the show schema only??

        return movies;
    } catch (error) {
        throw new Error("Error fetching movies");
    }
    // #TODO- Check the implementation is correct by using proper data
}

module.exports = { getAll,getFilteredResult };

