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
    const today = new Date();
    query.date = { $gte: today };
    if (filters.location) {
      query.city = filters.location;
    }

    if (filters.languages) {
      query.language = { $in: filters.languages.split("|") };
    }
    if (filters.format) {
      query.format = { $in: filters.format.split("|") };
    }

    if (filters.genre) {
      query.genre = { $in: filters.genre.split("|") };
    }
    const shows = await Show.aggregate([
      { $match: query },
      { $group: { _id: "$content_id", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "_id",
          as: "movieDetails",
        },
      },
      { $unwind: "$movieDetails" },
      {
        $project: {
          name: "$movieDetails.name",
          rating: "$movieDetails.rating",
          ratedby: "$movieDetails.ratedby",
          image_url: "$movieDetails.image_url",
          movie_rated: "$movieDetails.movie_rated",
          genre: "$movieDetails.genre",
        },
      },
    ]);
    return shows;
  } catch (error) {
    throw new Error("Error fetching movies");
  }
  // #TODO- Check the implementation is correct by using proper data
}

async function getFilters(location) {
    try {
      const today = new Date();
      const result = await Show.aggregate([
        {
            $match: {
                city: location,
                date: { $gte: today },
            }
        },
        { $unwind: "$genre" }, 
        {
          $group: {
            _id: null,
            languages: { $addToSet: "$language" },
            formats: { $addToSet: "$format" },
            genres: { $addToSet: "$genre" }
          }
        },
      ]);
      // console.log(result);
      
      if (result.length > 0) {
        return {
          languages: result[0].languages,
          formats: result[0].formats,
          genres: result[0].genres
        };
      } else {
        return { languages: [], formats: [], genres: [] };
      }
      
    } catch (error) {
      throw new Error("Error fetching filters");
    }
  }
  

async function getById(id) {
  try {
    const movie = await Movie.findById(id);
    return movie;
  } catch (error) {
    throw new Error("Error fetching movie");
  }
}

async function getUpcoming(filters) {
    try {
        const query = {};
        const today = new Date();
        query.releaseDate = { $gte: today };
        if (filters.languages) {
        query.language = { $in: filters.languages.split("|") };
        }
        if (filters.format) {
        query.format = { $in: filters.format.split("|") };
        }
        if (filters.genre) {
        query.genre = { $in: filters.genre.split("|") };
        }
        // #TODO- make a split filter utils function that splits the  filters on the basis of the particular word.
        const movies = await Movie.aggregate([
            { $match: query }, // Match the provided query
            {
                $lookup: {
                    from: "shows",
                    localField: "_id",
                    foreignField: "content_id",
                    as: "showDetails",
                },
            },
            {
                $addFields: {
                    showCount: { $size: "$showDetails" } // Add a field to count the number of showDetails
                }
            },
            { $match: { showCount: 0 } }, // Match movies with no shows
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image_url: 1,
                    releaseDate: 1,
                    likes: 1,
                    genre: 1,
                }
            }
        ]);
        
        return movies;
  } catch (error) {
    throw new Error("Error fetching Upcoming movies");
  }
}

module.exports = { getAll, getFilteredResult, getById, getUpcoming ,getFilters};
