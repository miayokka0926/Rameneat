
var Order = require('../models/order');




exports.orderListGet = function(req, res){
    if (req.params.vendorId.match(/^[0-9a-fA-F]{24}$/)) {
        Order.find( {vendor:req.params.vendorId, status: req.query.status }).then((orders) => {
            if (orders.length == 0) {
                res.status(404).json({success: false, err: 'can not find any orders'})
            } else {
                res.status(200),json({success: true, orders: orders})
            }
            
        })
    }
    
};




exports.orderCreatePost = function(req, res){
    const order = new Order({
        customer: req.body.customer,
        vendor: req.body.vendor,
        snacks: req.body.snacks
    })
   order.save((err, createdOrder)=>{
       if (err){
           res.status(400).json({success:false, err:err})
       }else{
           res.status(200).json({success:true, order:createdOrder})
       }
   })
    
};


exports.OrderUpdatePost = function(req, res){
    Order.findById(req.params.id).then((order)=>{
        if (!order){
            res.status(404).json({err: 'order not found'})
        } else {
            Order.findByIdAndUpdate(
                req.params.id,
                {snacks: req.body.snacks, status:req.body.status },
                {new: true },
                function(err, updatedOrder){
                    if(err){
                        res.status(404).json({success: false, err: err })
                    } else {
                        res.status(200).json({success: true, updatedOrder: updatedOrder})
                    }
                }
            )
        }
    });
   
};