//import the resources
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const server = require('http').createServer(app);
const io = require("socket.io")(server);


app.use(cors());
app.use(bodyParser.json());

io.of("/api/socket").on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);
    socket.on("disconnect", () => {
        console.log("socket.io: User disconnect: ", socket.id);

    });
   
});

//connect to mongoose database
const mongoose = require('mongoose')

let connectionURL = "mongodb+srv://ChiZhang:Relax1017@snack.7ro1t.mongodb.net/Snack_Database?retryWrites=true&w=majority"

mongoose.
    connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName: 'Snack_Database' })
    .then(() => console.log("MongoDB Connected."))
    .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("setting change streams");
    const orderChangeStream = connection.collection("orders").watch();

    orderChangeStream.on("change", (change) => {
        //three conditions of changing orders
        switch (change.operationType) {
            case "insert":
                console.log("insertion at backend.");
                const order = {
                    _id: change.fullDocument._id,
                    customer: change.fullDocument.customer,
                    vendor: change.fullDocument.vendor,
                    snacks: change.fullDocument.snacks,
                    createdAt: change.fullDocument.createdAt,
                };
                io.of("/api/socket").emit("newOrder", order);
                break;

            case "update":
                console.log("update at backend.");
                io.of("/api/socket").emit("updateOrder", change.documentKey._id);
                break;

            case "delete":
                console.log("delete at backend");
                io.of("/api/socket").emit("deleteOrder", change.documentKey._id);
                break;
        }
    })
})

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
server.listen(port, () => { console.log('The website is listening on port 3000!', port) })

module.exports = app;
