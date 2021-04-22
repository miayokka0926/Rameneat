const express = require('express')
const router = express.Router();

var snackController = require('../controllers/snackController');

//view menu
router.get('/', snackController.snackListGet);

//view snack detail
router.get('/:id', snackController.snackDetailGet);

//create new snacks
router.post('/create', snackController.snackCreatePost);

module.exports = router;