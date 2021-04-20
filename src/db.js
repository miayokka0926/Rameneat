const mongoose = require('mongoose')

let connectionURL = "mongodb+srv://ChiZhang:Relax1017@snack.7ro1t.mongodb.net/Snack_Database?retryWrites=true&w=majority"

mongoose.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName: 'Snack_Database'})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('connected to Mongo')
})
// 以上全部都是Connecting MongoDB


// 设置每一个Snack的document Schema（现阶段每个Snack具有特征：id，名字，价格，对应照片；不知道要不要加一段文字描述这个Snack）
const snackSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    Snack_Price: {type: String, required: true, unique: true},
    img: {type: String, required: true, unique: true}
})

// 设置每一个Vendor的document Schema（现阶段每个Vendor具有特征：名字，密码，营业状态，自行输入地址，精准地图坐标地址；不知道还要加什么其他信息）
const vanSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    status: {type: String, required: true, unique: true},
    location: {type: String, required: true, unique: true},
    geoLocation: { 
        longtitude: {type: Number, required: true, unique: false},
        latitude: {type: Number, required: true, unique: false},
    }
})

// 设置每一个Vendor所持有的outstanding orderlist Schema（这个只是测试代码，具体输入中的特征“foods”肯定不是这样写，应该像一个object list才对）
const orderlistSchema = new mongoose.Schema({
    name:  {type: String, required: true, unique: true},
    foods: {type: String, required: true, unique: true}
})


const userSchema = new mongoose.Schema({
    name:  {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true}
})


// 将Schema全部转换为mongoose model并传出（用于app.js中）
const User = mongoose.model('User', userSchema, 'User')
const Snack = mongoose.model('Snacks', snackSchema, 'Snacks')
const Van = mongoose.model('Vendor', vanSchema, 'Vendor')
const Orderlist = mongoose.model('VanOrderlist', orderlistSchema, 'VanOrderlist')
module.exports = {User, Snack, Van, Orderlist}