const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; 
const ratingSchema = new Schema({
    entity: { type: String, required: true },
    userId: { type: ObjectId, required: true },
    entityId: { type: ObjectId, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: false }
},({timestamps:true}));

const Rating = mongoose.model('ratings', ratingSchema);
module.exports = Rating;