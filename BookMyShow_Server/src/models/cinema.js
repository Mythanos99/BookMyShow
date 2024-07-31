const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  house_no: { type: String, default: '' },
  street: { type: String, default: '' },
  area: { type: String, default: '' },
  pincode: { type: String, default: '' }
});

const cinemaSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: addressSchema, required: true },
  screens: { type: Number, required: true },
  food_service : { type: Boolean, default: false }
}, { timestamps: true });

const Cinema = mongoose.model('cinemas', cinemaSchema);
module.exports = Cinema;
