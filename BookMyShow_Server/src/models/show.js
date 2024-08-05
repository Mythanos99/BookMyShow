const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; // Import ObjectId

const seatSchema = new Schema({
    type: { type: String, required: true },
    status: { type: [String],required:true },
    price: { type: Number, required: true },
});
const showSchema = new Schema({
    identity: { type: String, required: true },
    content_id: { type: ObjectId, required: true },
    location_id: { type: String, required: true }, // #FIXME- location_id should be ObjectId also.
    start_time:{ type: Date, required: true },
    end_time:{ type: Date, required: true },
    city:{type:String,required:true},
    language:{type:String,required:true},
    format:{type:String,required:true},
    seat_info: { type: [seatSchema], required: true },
}, { timestamps: true });

const Show = mongoose.model('shows', showSchema);
module.exports = Show;



