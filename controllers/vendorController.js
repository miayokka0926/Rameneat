const bcrypt = require('bcryptjs');

var Vendor = require('../schemas/vendor');


//register a vendor and post the information to website & database
exports.vendorRegisterPost = function (req, res) {
    const { name, password } = req.body;
    Vendor.findOne({ name: name }).then((vendor) => {
        if (vendor) {
            res.status(409).json({ error: 'Vendor already registered.' });
        } else {
            const newVendor = new Vendor({
                name,
                password
            })
            //hash the password to improve security
            bcrypt.genSalt(6, (err, salt) => {
                bcrypt.hash(newVendor.password, salt, (err, hash) => {
                    if (err) throw err;
                    newVendor.password = hash;
                    newVendor.save().then((vendor) => {
                        res.json({
                            vendor: {
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


exports.vendorLoginPost = function(req,res){
    const{ name, password } = req.body;
    Vendor.findOne({
        name:name,
    }).then ((vendor)=>{
        if (!vendor){
            res.status(200).json({ success:false, error: "vendor not registered!" });
        }else {
            bcrypt.compare(password, vendor.password, (err, match)=>{
                if (match) {
                    res.status(200).json({
                        success: true,
                        vendor:{
                            id: vendor.id,
                            name: vendor.name,
                            password: password,
                        }
                    })

                } else {
                    res.status(409).json({ error: "incorrect password!"})
                }
            })
        }
    })
}



//update vendor's parking status
exports.vendorStatusPost = function (req, res) {

    Vendor.findByIdAndUpdate(req.params.id,
        { 
            Address: req.body.Address, 
            parked: req.body.parked, 
            location: { type: "Point", coordinates: req.body.location }
        },
        { new: true },
        function (err, updated) {
            if (err) {
                res.status(404).json({ success: false, message: "vendirId is not found" });
            } else {
                res.status(200).json({ success: true, updated: updated });
            }
        }
    );
};

// GET request to get five nearest vendors
exports.vendorFiveGet = function (req, res) {
    Vendor.find().exec((err, vendors) => {
        if (err) {
            res.status(404).json({ success: false, err: err })
        } else {
            var mapDistance = []
            for (i = 0; i < vendors.length; i++) {
                var distance = Math.sqrt(Math.hypot(
                    req.query.lat - vendors[i].location.coordinates[0],
                    req.query.lng - vendors[i].location.coordinates[1]
                ))
                if (Number.isFinite(distance)) {
                    mapDistance.push({
                        "id": vendors[i].id,
                        "name": vendors[i].name,
                        "textAddress": vendors[i].textAddress,
                        "distance": parseFloat(distance).toFixed(4),
                        "location": vendors[i].location.coordinates
                    })
                }
            }
            mapDistance = mapDistance.sort(({ distance: a }, { distance: b }) => a - b).slice(0, 5)
            res.status(200).json({ success: true, vendors: mapDistance })
        }
    })
};