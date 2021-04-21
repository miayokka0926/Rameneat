// Set up Express for the order stuff route
const express = require('express')
const router = express.Router();

var orderController = require('../controllers/orderController');

router.post('/create', orderController.orderCreatePost);

// View outstanding orders of vendor
router.get('/:vendorId', orderController.orderListGet);

// Update order status
router.post('/:id/update', orderController.OrderUpdatePost);

module.exports = router;