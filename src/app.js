const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const app = express()


app.use(bodyParser.json());


const mongoose = require('mongoose')

let connectionURL = "mongodb+srv://ChiZhang:Relax1017@snack.7ro1t.mongodb.net/Snack_Database?retryWrites=true&w=majority"

mongoose.
    connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName: 'Snack_Database'})
    .then(()=>console.log("MongoDB Connected."))
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('connected to Mongo')
})


const customer = require('../routes/customer');
app.use('/customer', customer);

const vendor = require('../routes/vendor');
app.use('/vendor', vendor);

const snack = require('../routes/snack');
app.use('/snack', snack);

const order = require('../routes/order');
app.use('/order', order);

// 以下为运行Localhost的部分
const port = process.env.PORT || 3000
app.listen(port, () => {console.log('The website is listening on port 3000!', port)})