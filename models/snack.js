const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SnackSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    
    img: {
        type:String,
        required: true,
        
    },
    price: {
        type: String,
        required: true,
    }
});

Snack = mongoose.model("Snack", SnackSchema);
module.exports = Snack;