
var Snack = require('../schemas/snack');

exports.snackListGet = function(req, res){
    Snack.find().exec((err, snacks)=>{
        if(err){
            res.status(400).json({success: false, err:err})
        }else{
            res.status(200).json({success: true, snacks:snacks })
        }
    })
   
};

exports.snackDetailGet = function(req, res){
    Snack.findById(req.params.id, function(err, snack){
        if (snack){
            res.status(200).json({success: true, snack: snack})
        }else {
            res.status(400).json({success: false, err: err })
        }
    })
   
};


//create a new snack and post on to the website & database
exports.snackCreatePost = function(req, res){
    Snack.findOne({
        name: req.body.name
    }).then((snack)=> {
        if (snack) {
            res.status(409).json({error: "Item already exists"});
        }else {
            const snack = new Snack({
                name: req.body.name,
                img: req.body.img,
                price: req.body.price,
                description: req.body.description
            });
            snack.save((err, detail)=>{
                if(err){
                    res.status(400).json({success: false, err});
                }else {
                    res.status(200).json({success: true, detail});
                }
            });
        }
        
    
    })
};
