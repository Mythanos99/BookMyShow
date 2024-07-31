
const Show = require('../models/show');
ObjectId = require('mongodb').ObjectId;

async function getAvailableShowsByFormat(id, format, location) {
    try {
      const results = await Show.aggregate([
        {
          $match: {
            content_id: new ObjectId(id),
            format: format,
            city: location,
          }
        },
        {
          $group: {
            _id: { date: "$date", cinema_id: "$location_id" },
            shows: {
              $push: {
                _id: "$_id",
                start_time: "$start_time",
              }
            }
          }
        },
        {
          $lookup: {
            from: "cinemas",
            localField: "_id.cinema_id",
            foreignField: "_id",
            as: "cinemaDetails"
          }
        },
        {
          $unwind: "$cinemaDetails"
        },
        {
          $group: {
            _id: "$_id.date",
            cinemas: {
              $push: {
                cinema_id: "$cinemaDetails._id",
                cinema_name: "$cinemaDetails.name",
                location: "$cinemaDetails.location",
                shows: "$shows"
              }
            }
          }
        },
        {
          $sort: { "_id": 1 }
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            cinemas: 1
          }
        }
      ]);
  
      return results;
    } catch (error) {
      throw new Error("Error fetching available shows");
    }
  }
  
  
  

//   #FIXME- need to check the working of this by getting more data.
  

module.exports={
    getAvailableShowsByFormat
}