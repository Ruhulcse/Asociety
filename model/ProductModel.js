const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:[true,'A Product must have a Name'],
        trim:true
    },
    rattingAverage:{
        type:Number,
        default:0,
        max:5

    },
    rattingQuantity:{
        type:Number,
        default:0,

    },
    productTye:{
        type:String,
        required:[true,'A Product must have a Type'],
        trim:true

    },
    productprice:{
        type:Number,
        required:[true,'A Product must have a a price'],
    },
    deliveryprice:{
        type:Number,
        required:[true,'A Product must have a a price'],
    },
    product_color:{
        type:[String],
        require:true,
        default:["#ffffff"]

    },
    product_size:{
        type:String,
        trim:true,
        required:true
    },
    priceDiscount: Number,
    
    description:{
        type:String,
        trim:true,
        required: [true, 'A Product must have a Description']
    },
   
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now()
    }
   
});

const product = mongoose.model('Product',productSchema );

module.exports =  product;