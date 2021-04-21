// Set up Express for the snack route
const express = require('express')
const router = express.Router();

var snackController = require('../controllers/snackController');

// Customers view the snack menu
router.get('/', snackController.snackListGet);

// Clicking particular snack to view the food detail through specifying food id
router.get('/:id', snackController.snackDetailGet);

module.exports = router;