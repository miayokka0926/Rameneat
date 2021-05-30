const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//define the schema of an order
var OrderSchema = new Schema({

    customer: {
        type: Schema.Types.ObjectId,
        ref:'Customer'
    },
    
    vendor: {
        type: Schema.Types.ObjectId,
        ref:'Vendor'
    },
    
    snacks: {
        type:Array,
        default:[]
        
    },

    status: {
        type: String,
        default: 'outstanding',
    },

    ratings: {
        type: Number,
    },


    comment: {
        type: String,
    },

    total: {
        type: Number,
    },

    discount: {
        type: Boolean,
    }

},{timestamps: true});



Order = mongoose.model("Order", OrderSchema);
module.exports = Order;