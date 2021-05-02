const express = require('express')
const router = express.Router();

var customerController = require('../controllers/customerController');

//register a new customer
router.post('/register', customerController.customerRegisterPost);

//customer login
router.post('/login', customerController.customerLoginPost);

module.exports = router;