const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  houseno: { type: String, default: '' },
  street: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  pincode: { type: String, default: '' }
});

const personalDetailsSchema = new Schema({
  name: { type: String, default: '' },
  dob: { type: Date, default: Date.now }
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  mobile_no: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  address: { type: addressSchema, default: {} },
  personal_details: { type: personalDetailsSchema, default: {} },
  booking_ids: { type: [String], default: [] }
},{ timestamps: true });

const User = mongoose.model('users', userSchema)

module.exports = User