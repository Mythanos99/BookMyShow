const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    identity: { type: String , required: true },  //#TODO- Identity should be one of the 4 values
    items: { type: [String], required: true },
    access:{ type: [String], required: true }
}, { timestamps: true });

const Business = mongoose.model('businesses', businessSchema);
module.exports = Business;