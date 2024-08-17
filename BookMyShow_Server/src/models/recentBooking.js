const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; 
const foodSchema=new Schema({
    id:{type:String,required:false}, // This is the id of the food item. 
    name:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
})

const lastBookingSchema = new Schema({
    // entity: { type: String, required: true }, // entity is either MOV or EVE
    show_id: { type: ObjectId, required: true },
    seats: { type: [String], required: true },
    food: { type: [foodSchema], required: false },
},({timestamps:true}));

const recentBookingSchema = new Schema({
    user_id: { type: ObjectId, required: true ,index:true},
    last_bookings: { type: [lastBookingSchema], required: true }
},({timestamps:true}));

const RecentBooking = mongoose.model('recent_bookings', recentBookingSchema);
module.exports = RecentBooking;

// #TODO- check the use of indexes on the MongoDB for other collections as well.    