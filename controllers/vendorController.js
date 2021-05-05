const bcrypt=require('bcryptjs');

var Vendor = require('../schemas/vendor');


//register a vendor and post the information to website & database
exports.vendorRegisterPost = function(req, res){
    const{name, password} = req.body;
    Vendor.findOne({name: name}).then((vendor)=>{
        if(vendor){
            res.status(409).json({error: 'Vendor already registered.'});
        }else{
            const newVendor = new Vendor({
                name,
                password
            })
            //hash the password to improve security
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



//update vendor's parking status
exports.vendorStatusPost = function(req, res){

    
    Vendor.findByIdAndUpdate(req.params.id,
        {Address: req.body.Address, parked: req.body.parked, location:{type: "Point", coordinates: req.body.location}},
        {new : true},
        function(err, updated){
            if(err){
                res.status(404).json({success: false, message: "vendirId is not found"});
            }else {
                res.status(200).json({success: true, updated:updated});
            }
        }
    );
     
};