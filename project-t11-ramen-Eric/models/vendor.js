// Vendor schema structure in the database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VendorSchema = new Schema({
    name:{
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
    password:{
        type:String,
        required: true
        
    },
    Address:{
        type:String

    },
    parked:{
        type:Boolean,
        required: true,
        default: false
    }
});

Vendor = mongoose.model("Vendor", VendorSchema);
module.exports = Vendor;