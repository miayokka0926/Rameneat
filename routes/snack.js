const express = require('express')
const router = express.Router();

var snackController = require('../controllers/snackController');

//view menu
router.get('/', snackController.snackListGet);

//view detail
router.get('/:id', snackController.snackDetailGet);

//create new item
router.post('/create', snackController.snackCreatePost);

module.exports = router;