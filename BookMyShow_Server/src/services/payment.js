const Payment=require('../models/payment');
async function makePayment(payment){
    try{
        const paymentModel=new Payment(payment);
        const result=await paymentModel.save();
        return result._id;
    }catch(error){
        console.error('Error Making Payment',error);
    }
}

module.exports={makePayment};

// #TODO- check if save is deprecated or not.(insertOne)