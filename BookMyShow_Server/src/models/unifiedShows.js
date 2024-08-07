const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId

const AddressSchema = new Schema({
  Houseno: { type: String },
  street: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  pincode: { type: Number },
  country: { type: String }
});

const UnifiedShowSchema = new Schema({
  identity: { type: String, enum: ['EVE', 'PLY', 'SPO', 'ACT'], required: true },
  eventId: { type: ObjectId, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  duration: { type: Number, required: true },
  location: { type: AddressSchema, required: true },
  category: { type: String },
  image_url: { type: String },
  city: { type: String, required: true }
},{ timestamps: true });
const UnifiedShow = mongoose.model('unified_shows', UnifiedShowSchema);
module.exports = UnifiedShow;
