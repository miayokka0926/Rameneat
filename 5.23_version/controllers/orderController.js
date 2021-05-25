
var Order = require('../schemas/order');



//Get order list from database
exports.orderListGet = function (req, res) {
    Order.find(req.query).populate("vendor").populate("customer").then((orders) => {
        if (orders.length == 0) {
            res.status(404).json({ success: false, errMessage: "no order found" })
        } else {
            res.status(200).json({ success: true, allOrders: orders })
        }
    })
}



//create an order an post on to the website & database
exports.orderCreatePost = function (req, res) {
    const order = new Order({
        customer: req.body.customer,
        vendor: req.body.vendor,
        snacks: req.body.snacks,
        total: req.body.total,
    })
    order.save((err, newOrder) => {
        if (err) {
            res.status(400).json({ success: false, err: err })
        } else {
            res.status(200).json({ success: true, order: newOrder })
        }
    })

};



exports.orderUpdatePost = function (req, res) {
    Order.findById(req.params.id).then((order) => {
        if (!order) {
            res.status(404).json({ err: 'order not found' })
        } else {
            Order.findByIdAndUpdate(
                req.params.id,
                req.body,
                // { snacks: req.body.snacks, status: req.body.status },
                { new: true },
                function (err, updatedOrder) {
                    if (err) {
                        res.status(404).json({ success: false, err: err })
                    } else {
                        res.status(200).json({ success: true, updatedOrder: updatedOrder })
                    }
                }
            )
        }
    });

};
