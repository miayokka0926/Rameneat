// setup Mongoose
const mongoose = require('mongoose')

let connectionURL = "mongodb+srv://ChiZhang:Relax1017@snack.7ro1t.mongodb.net/Snack_Database?retryWrites=true&w=majority"

mongoose.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName: 'Snack_Database'})
const db = mongoose.connection

// event handlers
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('connected to Mongo')
})

const snackSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    Snack_Price: {type: String, required: true, unique: true},
    img: {type: String, required: true, unique: true}
})

const vanSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    status: {type: String, required: true, unique: true},
    geolocation: { type: [Number], index: { type: '2dsphere', sparse: true}},
    location: {type: String, required: true, unique: true}
})

const Snack = mongoose.model('Snacks', snackSchema, 'Snacks')
const Van = mongoose.model('Vendor', vanSchema, 'Vendor')
module.exports = {Snack, Van}