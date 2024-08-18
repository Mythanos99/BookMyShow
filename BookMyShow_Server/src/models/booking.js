const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; 
const foodSchema=new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}
})
const BookingSchema = new Schema({
    user_id: { type: ObjectId, required: true },
    show_id: { type: ObjectId, required: true },
    identity: { type: String, required: true },
    transaction_id: { type: ObjectId, required: true },
    amount: { type: Number, required: true },
    seats: { type: [String], required: true },
    food: { type: [foodSchema], required: false },

}, { timestamps: true });


const Booking = mongoose.model('bookings', BookingSchema);
// module.exports = { schema: foodSchema };
module.exports = Booking;