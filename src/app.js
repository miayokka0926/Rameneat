//import the resources
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());

//connect to mongoose database
const mongoose = require('mongoose')

let connectionURL = "mongodb+srv://ChiZhang:Relax1017@snack.7ro1t.mongodb.net/Snack_Database?retryWrites=true&w=majority"

mongoose.
    connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName: 'Snack_Database' })
    .then(() => console.log("MongoDB Connected."))
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('connected to Mongo')
})


//import routes information
const customer = require('../routes/customer');
app.use('/customer', customer);

const vendor = require('../routes/vendor');
app.use('/vendor', vendor);

const snack = require('../routes/snack');
app.use('/snack', snack);

const order = require('../routes/order');
app.use('/order', order);


//serve static assets
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// execute localhost
const port = process.env.PORT || 3000
app.listen(port, () => { console.log('The website is listening on port 3000!', port) })