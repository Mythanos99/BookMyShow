const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId; 

const PaymentSchema = new Schema({
    user_id: { type: ObjectId, required: true },
    show_id: { type: ObjectId, required: true },
    identity: { type: String, required: true },
    seats: { type: [String], required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    payment_time: { type: Date, default: Date.now },
}, { timestamps: true });

const Payment = mongoose.model('payments', PaymentSchema);
module.exports = Payment;


