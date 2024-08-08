const ratingsBatch = {}; 
const Movie = require('../models/movie'); 
const Rating = require('../models/rating'); 
const Event = require('../models/event'); 
const Play = require('../models/play'); 
const Sport = require('../models/sport'); 
const Activity = require('../models/activity'); 
const utils=require('../utils/utils');
/**
 * Add a rating to the batch.
 * @param {string} entity - The type of entity being rated (MOV, EVE, PLY, SPO, ACT).
 * @param {string} entityId - The ID of the entity.
 * @param {number} rating - The rating given by the user.
 */
function addRatingToBatch(entity, entityId, rating) {
  const key =entityId;
  if (!ratingsBatch[key]) {
    ratingsBatch[key] = {
      entity: entity,
      totalRating: 0,
      ratingCount: 0,
    };
  }
  ratingsBatch[key].totalRating += rating;
  ratingsBatch[key].ratingCount += 1;
  console.log(ratingsBatch);
}

async function addIndividualRating(rating) {
    try{
        const newRating = new Rating(rating);
        await newRating.save();
        return true;
    } catch (error) {
        console.error("Error adding rating:", error);
        return false;
    }

}
/**
 * Get and clear the current batch of ratings.
 * @returns {object} The current batch of ratings.
 */
function getAndClearRatingsBatch() {
  const batch = { ...ratingsBatch };
  for (const key in ratingsBatch) {
    delete ratingsBatch[key];
  }
  return batch;
}


/**
 * Update ratings in the database for different entities.
 * @param {object} ratingsBatch - The batch of ratings to update.
 */
async function updateEntityRatings(ratingsBatch) {
    for (const key in ratingsBatch) {
      const { totalRating, ratingCount,entity} = ratingsBatch[key];

      model=utils.getModelName(entity);
  
     // Fetch the current entity from the database
     const currentEntity = await model.findById(key);
     if (!currentEntity) {
         console.error(`Entity with ID ${key} not found.`);
         continue;
     }
     // Calculate new average rating
     const currentRatingCount = currentEntity.ratedby|| 0;
     const currentTotalRating = currentEntity.rating*currentRatingCount || 0;
     const newTotalRating = currentTotalRating + totalRating;
     const newRatingCount = currentRatingCount + ratingCount;
     const newAverageRating = newTotalRating / newRatingCount;

     // Update the entity with the new average rating and reviews
     await model.findByIdAndUpdate(key, {
         $set: { 
             rating: newAverageRating,
             ratedby: newRatingCount
         },
     });
 }
}

module.exports = {
    addRatingToBatch,
  getAndClearRatingsBatch,
  addIndividualRating,
  updateEntityRatings
};
