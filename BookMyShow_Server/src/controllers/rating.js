const rating_service = require("../services/rating");

async function addRating(req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    const { entity, entityId, rating } = req.body;
    if (!entity || !entityId || !rating || isNaN(rating)) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }

    rating_service.addIndividualRating(req.body);  
    rating_service.addRatingToBatch(entity, entityId, rating);

    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { addRating };
