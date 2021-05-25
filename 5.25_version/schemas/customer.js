const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define a customer schema
var CustomerSchema = new Schema({
    givenName:{
        type:String,
    }, 
    familyName:{
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