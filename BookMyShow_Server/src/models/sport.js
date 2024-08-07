const mongoose = require('mongoose');
const { Schema } = mongoose;

const SportSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  ratedby: { type: Number, default: 0 },
  category: { type: String },
  image_url: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});
// #FIXME- review schema is needed to be put properly.

module.exports = mongoose.model('Sport', SportSchema);
