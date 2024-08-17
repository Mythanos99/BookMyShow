
const Show = require('../models/show');
ObjectId = require('mongodb').ObjectId;

async function getAvailableShowsByFormat(id, format, location) {
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set the time to 12 AM

      const results = await Show.aggregate([
        {
          $match: {
            movie_id: new ObjectId(id),
            format: format,
            city: location,
            show_date: { $gte: currentDate }  // TODO- uncomment this later
          }
        },
        {
          $group: {
            _id: { date: "$show_date", cinema_id: "$cinema_id" },
            shows: {
              $push: {
                _id: "$_id",
                start_time: "$start_time",
                seat_info: "$seat_info"
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
                food_service: "$cinemaDetails.food_service",
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

  async function getById(id) {  
   try{
    const show= await Show.findOne({_id:id});
    return show;
   } catch(error){
    throw new Error("Error fetching show by id");
   }
  }
  // #FIXME- get only the shows that have date grater than today.
  
  async function updateSeat(showId,seat_info){
    try{
      const show=await Show.findOne({_id:showId});
      show.seat_info=seat_info;
      const result=await show.save(); 
      // #FIXME- check if this is the right method for updating the database.
      return result;
    }catch(error){
      throw new Error("Error updating show seat info");
    }
  } 
  

//   #FIXME- need to check the working of this by getting more data.
async function getSlots(id, date) {
  try {
      // Convert the date to a string in YYYY-MM-DD format for exact matching
      // Query the database for shows matching the cinema ID and exact date
      const shows = await Show.aggregate([
        {
            $match: {
                cinema_id: new ObjectId(id), // Ensure this matches the type in your database
                // show_date: date
            }
        },
        {
            $group: {
                _id: "$screen",
                shows: {
                    $push: {
                        start_time: "$start_time",
                        end_time: "$end_time"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                screen: "$_id",
                shows: 1
            }
        }
    ]);
      return shows;
  } catch (error) {
      console.error("Error fetching slots:", error);
      throw new Error("Error fetching slots");
  }
}


module.exports={
    getAvailableShowsByFormat,getById,updateSeat,getSlots
}