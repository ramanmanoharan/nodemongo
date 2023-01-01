var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('frontend/index', { title: 'Website Development Company in Vellore' });
});

router.get('/about', function(req, res, next) {
  res.render('frontend/about', { title: 'Abour Ramsoft' });
});

router.get('/work', function(req, res, next) {
  res.render('frontend/work', { title: 'Ram Work' });
});

router.get('/clients', function(req, res, next) {
  res.render('frontend/clients', { title: 'Clients details' });
});

router.get('/news', function(req, res, next) {
  res.render('frontend/news', { title: 'News' });
});

router.get('/contact', function(req, res, next) {
  res.render('frontend/contact', { title: 'Contact Us' });
});
module.exports = router;

