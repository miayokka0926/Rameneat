const express = require('express')
var path = require('path')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const app = express()
app.use(express.json())  

const {Snack} = require('./db.js')
const {Van} = require('./db.js')

app.engine('hbs', exphbs({
	defaultlayout: 'main',
	extname: 'hbs'
}))

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extended:true}))


app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_Template/FrontPage.html'))
})

app.get('/customer', async (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_Template/CustomerMenu.html'))
})

app.get('/vendor', async (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML_Template/VendorLogin.html'))
})

// 此部分为Vendor登录输入信息，然后updata到数据库说明开张
app.post('/vendor/location', async (req, res) =>{
    const postInfo = req.body;
    const vanUser = await Van.findOne({name: postInfo.VendorName, password: postInfo.password}).select('_id').lean();
    if (vanUser){
        await Van.updateOne( {name: postInfo.VendorName}, {status: 'ready_for_orders'} )
        res.sendFile(path.join(__dirname, 'HTML_Template/VendorOrderlist.html'))
    }
    else{
        res.sendFile(path.join(__dirname, 'HTML_Template/LoginFailure.html'))
    }    
})

app.post('/vendor/orderlist', async (req, res) =>{
    const postInfo = req.body;
    const vanUser = await Van.findOne({name: postInfo.VendorName, password: postInfo.password}).select('_id').lean();
    if (vanUser){
        await Van.updateOne( {name: postInfo.VendorName}, {status: 'ready_for_orders', location: postInfo.location} )
        res.sendFile(path.join(__dirname, 'HTML_Template/VendorOrderlist.html'))
    }
    else{
        res.sendFile(path.join(__dirname, 'HTML_Template/LoginFailure.html'))
    }    
})


app.get('/snack', async (req, res) => {
    result = await Snack.find( {}, {} ).lean()
    res.render('browse', {snacks: result})
})

// get one food - user specifies its name
app.get('/snack/:id', async (req, res) => {
    snack_Detail = await Snack.findOne( {id: req.params.id}, {})
    res.render('detail', {
        snackName: snack_Detail.name,
        snackPrice: snack_Detail.Snack_Price,
        snackImg: snack_Detail.img
    })
})


app.get('/addPancake', async (req, res) => {  // using GET for web demo
    const newSnack = new Snack({
            id: 10009,
            name: 'Pancake',
            Snack_Price: "$6",
            img: "https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80"
    }, {
		versionKey: false // You should be aware of the outcome after set to false
	});
    await newSnack.save()                    // Promise-style error-handler
    .then( (result)=> res.send(result) )    // Mongo operation was successful
    .catch( (err)=> res.send(err) )         // operation was not successful
})

app.get('/deletePancake', async (req, res) => {
    await Snack.deleteMany({ name: 'Pancake' })
    result = await Snack.find({}, {})
    res.send(result)
})

app.get('/updateLatte', async (req, res) => {
    await Snack.updateOne( {name:'Latte'}, {Snack_Price: '$5', img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"} )
    result = await Snack.find( {name: 'Latte'} )
    res.send(result)
})


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('The library app is listening on port 3000!', port)
})