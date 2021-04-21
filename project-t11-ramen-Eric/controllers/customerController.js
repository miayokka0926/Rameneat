const bcrypt = require('bcryptjs');

var Customer = require('../models/customer');

exports.customerRegisterPost = function(req, res){

    const{firstname, lastname, email, password} = req.body;
    Customer.findOne({email:email}).then((customer)=>{
        if(customer){
            // existing customer
            res.status(409).json({error: 'Customer already exists.'});
        }else{
            // new customer
            const newCustomer = new Customer({
                firstname,
                lastname,
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
                                firstname: customer.firstname,
                                lastname: customer.lastname,
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