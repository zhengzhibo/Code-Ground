var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {

  req.session.log = (req.session.log || 0) + 1
  res.send({a:req.session.log})
});

module.exports = router;
