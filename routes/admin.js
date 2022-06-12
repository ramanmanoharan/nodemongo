var express = require('express');
var router = express.Router();

var admin = require("../controllers/AdminController.js");

// Get all admins
router.get('/', admin.login);
router.get('/addslider', admin.addslider);
router.post('/saveslider', admin.saveslider);
router.get('/viewslider', admin.viewslider);
router.get('/sliderdelete/:id', admin.sliderdelete);
router.get('/slideredit/:id', admin.slideredit);
router.post('/updateslider/:id', admin.updateslider);


router.get('/logout', admin.logout);
// post login data
router.post('/autentication', admin.auth);
router.get('/dashboard', admin.dashboard);
// Get single admin by id




module.exports = router;