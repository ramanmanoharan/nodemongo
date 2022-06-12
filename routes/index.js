var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('frontend/index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('frontend/about', { title: 'Express' });
});

router.get('/work', function(req, res, next) {
  res.render('frontend/work', { title: 'Express' });
});

router.get('/clients', function(req, res, next) {
  res.render('frontend/clients', { title: 'Express' });
});

router.get('/news', function(req, res, next) {
  res.render('frontend/news', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('frontend/contact', { title: 'Express' });
});
module.exports = router;

