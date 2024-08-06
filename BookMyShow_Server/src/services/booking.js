const redis=require('../db/redis');
const show_service=require('../services/show');
const Booking=require('../models/booking');
async function isSeatAvaialble(showKey){
    try{
        const seats=await redis.get(showKey);
        return seats===null;
    }catch(error){
        console.error('Error Checking Seat availability ',error);
    }
}

async function ReserveSeat(showKey,userId){
    try{
        const result = await redis.set(showKey, userId, 'EX', 300); // 5 minutes expiration
        return result === 'OK';
        // #TODO write proper message to show that seat is booked.
    }catch(error){
        console.error('Error Reserving Seat',error);
    }
}

async function isBooked(showId, categoryId, rowId, seatId) {
    try {
        const showDetails = await show_service.getById(showId);
        const seatStatus = showDetails.seat_info[categoryId].status[rowId][seatId];
        const seatPrice = showDetails.seat_info[categoryId].price;

        if (seatStatus === '0') {
            return { isBooked: false, price: seatPrice };
        }
        return { isBooked: true, price: seatPrice };
    } catch (error) {
        console.error('Error Checking Seat availability', error);
        return { isBooked: null, price: null }; // Return a consistent structure in case of error
    }
}

async function createBooking(booking){
    try{
        const bookingModel=new Booking(booking);
        const result=await bookingModel.save();
        return result
    }catch(error){
        console.error('Error Creating Booking',error);
    }
}



module.exports={isSeatAvaialble,ReserveSeat,isBooked,createBooking};