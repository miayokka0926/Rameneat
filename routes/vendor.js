const express = require('express')
const router = express.Router();

var vendorController = require('../controllers/vendorController');

//register a new vendor
router.post('/register', vendorController.vendorRegisterPost);

//update vendor
router.post('/park/:id', vendorController.vendorStatusPost);

// GET request for five nearest vendors
router.get('/', vendorController.vendorFiveGet);

module.exports = router;