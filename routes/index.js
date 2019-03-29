var express = require('express');
var router = express.Router();
var db = require('../db/db');
var shortid = require('shortid');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {title: 'Code Ground'};
  res.render('index', data);
});


module.exports = router;
