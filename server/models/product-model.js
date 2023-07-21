const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true,
    },
    photo:{
       data:Buffer,
       contentType:String
    },
},{timestamps:true});

module.exports = mongoose.model('product',productSchema);