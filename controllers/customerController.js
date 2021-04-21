const bcrypt=require('bcryptjs');

var Customer = require('../models/customer');

exports.customerRegisterPost = function(req, res){

    const{name, email, password} = req.body;
    Customer.findOne({email:email}).then((customer)=>{
        if(customer){
            res.status(409).json({error: 'Customer already exists.'});
        }else{
            const newCustomer = new Customer({
                name,
                email,
                password
            })
            bcrypt.genSalt(6,(err,salt)=>{
                bcrypt.hash(newCustomer.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newCustomer.password = hash;
                    newCustomer.save().then((customer)=>{
                        res.json({
                            customer:{
                                name: customer.name,
                                email: customer.email,
                                password: customer.password
                            }
                        })
                    })
                })
            })
        }
    })
    
}