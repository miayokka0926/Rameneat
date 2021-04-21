const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name:{
        type:String,
        
    },
    location: {
        type:{
            type:String,
            enum:['Point']
        },
        coordinates:{
            type:[Number]
        }
        
    },
    email: {
        type:String,
        required: true,
        
    },
    password: {
        type:String,
        required: true,
        
    }
});

Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;