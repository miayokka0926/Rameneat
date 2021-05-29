const bcrypt = require('bcryptjs');

var Customer = require('../schemas/customer');


//register a new customer and post the information to website & database
exports.customerRegisterPost = function (req, res) {

    const { name, email, password, familyName } = req.body;
    Customer.findOne({ email: email }).then((customer) => {
        if (customer) {
            res.status(409).json({ succeess: false, error: 'Customer email already exists.' });
        } else {
            const newCustomer = new Customer({
                name,
                email,
                password, 
                familyName
            })
            //hash the password to improve security
            bcrypt.genSalt(6, (err, salt) => {
                bcrypt.hash(newCustomer.password, salt, (err, hash) => {
                    if (err) throw err;
                    newCustomer.password = hash;
                    newCustomer.save().then((customer) => {
                        res.json({
                            customer: {
                                name: customer.name,
                                email: customer.email,
                                password: customer.password, 
                                familyName: customer.familyName
                            }
                        })
                    })
                })
            })
            res.status(200).json({ success: true, message: "successfully registered!" })
        }
    })

}


exports.customerLoginPost = function (req, res) {
    const { email, password } = req.body;
    Customer.findOne({
        email: email,
    }).then((customer) => {
        if (!customer) {
            res.status(200).json({ success: false, error: "customer not registered!" });
        } else {
            bcrypt.compare(password, customer.password, (err, match) => {
                if (match) {
                    res.status(200).json({
                        success: true,
                        customer: {
                            id: customer.id,
                            name: customer.name,
                            email: customer.email,
                        }
                    })

                } else {
                    res.status(409).json({ error: err, message: "incorrect password!" })
                }
            })
        }
    })
}

exports.customerUpdatePost = function (req, res) {
    bcrypt.genSalt(6, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            Customer.findOneAndUpdate(
                { email: req.body.email },
                {
                    name: req.body.name,
                    familyName: req.body.familyName,
                    email: req.body.email,
                    password: hash
                },
                { new: true},
                function (err, updateCustomer) {
                    if (err) {
                        res.status(404).json({ success: false, message: "your email does not exist" })
                    } 
                    else {
                        res.status(200).json({ success: true, updateCustomer: updateCustomer })
                    }
                }
            )
        })
    })
}