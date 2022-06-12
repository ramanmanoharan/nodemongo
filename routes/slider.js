var express = require('express');
var router = express.Router();

var slider = require("../controllers/SliderController.js");

// Get all slider
router.get('/', slider.list);

// Get single slider by id
router.get('/show/:id', slider.show);

// Create slider
router.get('/create', slider.create);

// Save slider
router.post('/save', slider.save);

// Edit slider
router.get('/edit/:id', slider.edit);

// Edit update
router.post('/update/:id', slider.update);

// Edit update
router.post('/delete/:id', slider.delete);

module.exports = router;