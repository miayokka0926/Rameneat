const express = require('express')
const router = express.Router();

var vendorController = require('../controllers/vendorController');

//register a new vendor
router.post('/register', vendorController.vendorRegisterPost);

//update vendor
router.post('/park/:id', vendorController.vendorStatusPost);

module.exports = router;