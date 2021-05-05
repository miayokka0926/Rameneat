const express = require('express')
const router = express.Router();

var orderController = require('../controllers/orderController');


//create a new order
router.post('/create', orderController.orderCreatePost);

//view outstanding orders of vendor
router.get('/', orderController.orderListGet);

//update order
router.post('/:id/update', orderController.OrderUpdatePost);

module.exports = router;