const bcrypt=require('bcryptjs');

var Customer = require('../schemas/customer');


//register a new customer and post the information to website & database
exports.customerRegisterPost = function(req, res){

    const{name, email, password} = req.body;
    Customer.findOne({email:email}).then((customer)=>{
        if(customer){
            res.status(409).json({error: 'Customer email already exists.'});
        }else{
            const newCustomer = new Customer({
                name,
                email,
                password
            })
            //hash the password to improve security
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


exports.customerLoginPost = function(req,res){
    const{email, password} = req.body;
    Customer.findOne({
        email:email,
    }).then ((customer)=>{
        if (!customer){
            res.status(200).json({success:false, error: "customer not registered!"});
        }else {
            bcrypt.compare(password, customer.password, (err, match)=>{
                if (match) {
                    res.status(200).json({
                        success: true,
                        customer:{
                            id: customer.id,
                            name: customer.name,
                            email: customer.email,
                        }
                    })

                }else {
                    res.status(409).json({ error: err, message: "incorrect password!"})
                }
            })
        }
    })
}