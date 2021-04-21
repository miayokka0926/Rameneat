const express = require('express')
var path = require('path')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const app = express()

app.use(express.json())  
app.engine('hbs', exphbs({ defaultlayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended:true}))

const {Snack} = require('./db.js')
const {Van} = require('./db.js')
const {Orderlist} = require('./db.js')
// 从此往上都是写代码前下载的各式各样的model，method（我也不理解是啥，反正从老师的demo中照搬能用就是了）

// 主页面（主页面中内含两个链接，点击可进入Customer或Vendor端）
app.get('/', async (req, res) => {
    res.render('FrontPage')
})

// customer端主页面（内含菜单 和 个人信息编辑页面的链接）
app.get('/customer', async (req, res) => {
    res.render('CustomerMenu')
})

// vendor端登录面（需要vendor输入自己的vanName，设置的密码，以及粗略的地理位置输入）
app.get('/vendor', async (req, res) => {
    res.render('VendorLogin')
})

// 从vendor端登录面中下载vendor输入的数据进行与数据库匹配
// 如果数据库中的该VanName和Password都能匹配得上原有的输入，则更新该Vendor营业状态，更新粗略地址信息并让该Vendor用户进入Status（内含open & closed 链接）界面
// 如果数据库中的该VanName和Password没有匹配得上原有的输入，则退回vendor登陆界面
app.post('/vendor/status', async (req, res) =>{
    const postInfo = req.body;
    const vanUser = await Van.findOne({name: postInfo.VendorName, password: postInfo.password}).select('_id').lean();
    if (vanUser){
        await Van.updateOne( {name: postInfo.VendorName}, {status: 'ready_for_orders', location: postInfo.location} )
        res.render('vendorStatus',{
            vanName: postInfo.VendorName
        })
    }
    else{
        res.render('LoginFailure')
    }    
})

// 当Vendor成功登陆后在Status页面点击Open，自动导航到该Vendor的Outstanding Orderlist界面（Outstanding Orderlist每一个Vendor都独一无二）
app.get('/vendor/orderlist/:vanName', async(req, res)=>{
    result = await Orderlist.find( {name: req.params.vanName}, {})
    res.send(result)
})

// 当Vendor在Status页面点击Closed，自动导航回Vendor登录界面，并将该Logout Vendor的数据库信息更新（营业状态：Closed, 粗略地址：None，精确坐标：9999）
app.get('/vendor/:vanName', async(req, res) => {
    await Van.updateOne( {name: req.params.vanName}, {status: 'Closed', location: "None", geoLocation:{longtitude: 9999, latitude: 9999}})
    res.render('VendorLogin')
})

// 选择Customer端进入，点击View the Menu链接，自动进入菜单页面，将所有的Snack的名字，价格，照片全部印出来
app.get('/snack', async (req, res) => {
    result = await Snack.find( {}, {} ).lean()
    res.render('browse', {snacks: result})
})

// 在菜单中点击某一个Snack的图片，就可以进入该Snack的Detail界面，Detail界面将把该Snack的名字，价格，照片（以及其他我不知道要不要加的信息）全部印出来
app.get('/snack/:id', async (req, res) => {
    snack_Detail = await Snack.findOne( {id: req.params.id}, {})
    res.render('detail', {
        snackName: snack_Detail.name,
        snackPrice: snack_Detail.Snack_Price,
        snackImg: snack_Detail.img
    })
})

// 以下全都是测试代码：向数据库Snacks Collection新增一个Pancake
app.get('/addPancake', async (req, res) => {
    const newSnack = new Snack({
            id: 10009,
            name: 'Pancake',
            Snack_Price: "$6",
            img: "https://images.unsplash.com/flagged/photo-1557609786-fd36193db6e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80"
    }, {
		versionKey: false
	});
    await newSnack.save()     
    .then( (result)=> res.send(result) )    
    .catch( (err)=> res.send(err) )    
})

// 以下全是测试代码：将数据库Snacks Collection中的Pancake
app.get('/deletePancake', async (req, res) => {
    await Snack.deleteMany({ name: 'Pancake' })
    result = await Snack.find({}, {})
    res.send(result)
})

// 以下全是测试代码：将数据库Snacks Collection中的Latte数据内容更新以下
app.get('/updateLatte', async (req, res) => {
    await Snack.updateOne( {name:'Latte'}, {Snack_Price: '$5', img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"} )
    result = await Snack.find( {name: 'Latte'} )
    res.send(result)
})


// 以下为运行Localhost的部分
const port = process.env.PORT || 3000
app.listen(port, () => {console.log('The library app is listening on port 3000!', port)})