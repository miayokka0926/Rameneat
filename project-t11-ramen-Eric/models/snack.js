// Snack schema structure in the database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SnackSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    
    photo: {
        type:String,
        required: true,
    },

    price: {
        type:String,
        required: true,
    }
});

Snack = mongoose.model("Snack", SnackSchema);
module.exports = Snack;