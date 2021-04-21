// Customer schema structure in the database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    firstname:{
        type:String,
        required: true
        
    },
    lastname:{
        type:String,
        required: true
        
    },
    location:{
        type:{
            type:String,
            enum:['Point']
        },
        coordinates:{
            type:[Number]
        }
        
    },
    email:{
        type:String,
        required: true,
        
    },
    password:{
        type:String,
        required: true,
        
    }
});

Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;