const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema= new Schema({
    userId:{type:ObjectId,required:true},
    rating:{type:Number,required:true},
    MovieOrEventId:{type:ObjectId,required:true},
    review:{type:String,required:false}
})

modules.export=reviewSchema;