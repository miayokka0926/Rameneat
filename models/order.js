const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrderSchema = new Schema({
    name: {
        type:Schema.Types.ObjectId,
        ref:'Customer'
    },
    name: {
        type:Schema.Types.ObjectId,
        ref:'Vender'
    },
    
    foods: {
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
    }
},{timestamps: true});



Order = mongoose.model("Order", OrderSchema);
module.exports = Order;