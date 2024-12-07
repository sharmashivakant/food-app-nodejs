const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
   title:{
     type:String,
     required:[true, 'food title is required'],
   },
   description:{
     type:String,
     required:[true, 'food description is required'],
   },
   price:{
     type:Number,
     required:[true, 'food price is required'],
   },
   imageUrl:{
     type:String,
     default:'https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png'
   },
   foodTags:{
     type:String,
   },
   category:
   {
    type:String,
   },
   code:{
    type:String,
   },
   isAvailable:{
    type:Boolean,
    default:true
   },
   resturant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Resturant'

   },
   rating:{
    type:Number,
    default:5,
    min:1,
    max:5
   },
   ratingCount:{
    type:String,
   }
},{timestamps:true});

// export

module.exports = mongoose.model('Foods',foodSchema);