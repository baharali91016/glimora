const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName:{
        type:String,
        required:true
    },

    customerEmail:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    items:[

        {

            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },

            quantity:Number,

            price:Number

        }

    ],

    totalAmount:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        default:"Pending"
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Order",orderSchema);