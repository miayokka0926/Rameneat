const bcrypt = require('bcryptjs');

var Vendor = require('../models/vendor');

exports.vendorRegisterPost = function(req, res){

    const{name, password} = req.body;
    Vendor.findOne({name: name}).then((vendor)=>{
        if(vendor){
            // existing vendor
            res.status(404).json({error: 'Vendor already registered.'});
        }else{
            // new vendor
            const newVendor = new Vendor({
                name,
                password
            })
            bcrypt.genSalt(6,(err,salt)=>{
                bcrypt.hash(newVendor.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newVendor.password = hash;
                    newVendor.save().then((vendor)=>{
                        res.json({
                            vendor:{
                                name: vendor.name,
                                password: vendor.password
                            }
                        })
                    })
                })
            })
        }
    })
    
}

exports.vendorParkPost = function(req, res){

    Vendor.findById(req.params.id).then((vendor)=>{
        if(!vendor){
            res.status(409).json({error: 'Vendor do not exist.'});
        }else{
           Vendor.findByIdAndUpdate(
               req.params.id,
               {
                   Address: req.body.Address,
                   parked: req.body.parked,
                   location: {type: "Point", coordinates: req.body.location}
                },
                {new: true}, 
                function(err, updatedVendor) {
                    if(err){
                        res.status(404).json({success: false, err: err})
                    }else{
                        res.status(200).json({success: true, updatedVendor: updateVendor})
                    }
                }
            )
        }
    })
    
}