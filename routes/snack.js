const express = require('express')
const router = express.Router();

var snackController = require('../controllers/snackController');

//view menu
router.get('/', snackController.snackListGet);

//view detail
router.get('/:id', snackController.snackDetailGet);

module.exports = router;