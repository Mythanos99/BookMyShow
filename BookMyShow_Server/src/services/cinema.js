const Cinema = require("../models/cinema");
const Show = require("../models/show");
ObjectId = require('mongodb').ObjectId;


async function getAllByCity(city, page, limit) {
    try {
        const cinema = await Cinema.find({ city: { $regex: new RegExp(city, "i") } }).skip((page - 1) * limit).limit(limit);
        return cinema;
    } catch (error) {
        throw new Error("Error fetching cinema");
    }
}

async function getAll() {
    try {
        const cinema = await Cinema.find({});
        return cinema;
    } catch (error) {
        throw new Error("Error fetching cinema");
    }
}

async function getShowsByCinemaGrouped(cinemaId) {
    try {
      const results = await Show.aggregate([
        {
          // Match shows by the cinema's location_id
          $match: {
            location_id: new ObjectId(cinemaId)
          }
        },
        {
          // Group by date and then content_id (movie ID)
          $group: {
            _id: { date: "$date", movie_id: "$content_id" },
            shows: {
              $push: {
                _id: "$_id",
                start_time: "$start_time",
                end_time: "$end_time",
                format: "$format",
                language: "$language",
                genre: "$genre",
                seat_info: "$seat_info"
              }
            }
          }
        },
        {
          // Group by date to organize movies within the same date
          $group: {
            _id: "$_id.date",
            movies: {
              $push: {
                movie_id: "$_id.movie_id",
                shows: "$shows"
              }
            }
          }
        },
        {
          // Sort by date in ascending order
          $sort: { "_id": 1 }
        },
        // {
        //   // Format the output to include the date and movies
        //   $project: {
        //     _id: 0,
        //     date: "$_id",
        //     movies: 1
        //   }
        // }
      ]);
  
      return results;
    } catch (error) {
      throw new Error("Error fetching shows by cinema");
    }
  }

async function getCinemaDetails(cinemaId) {
    try {
        const cinema = await Cinema.findById(cinemaId);
        return cinema;
    } catch (error) {
        throw new Error("Error fetching cinema details");
    }
}
async function addCinema(cinemaData) {
    try {
        const cinema = new Cinema(cinemaData);
        await cinema.save();
        return cinema;
    } catch (error) {
        throw new Error("Error adding cinema");
    }
}
module.exports = { getAllByCity,getAll,getShowsByCinemaGrouped, getCinemaDetails,addCinema};