// Set up Express for the customer route
const express = require('express')
const router = express.Router();

var customerController = require('../controllers/customerController');
router.post('/register', customerController.customerRegisterPost);

module.exports = router;