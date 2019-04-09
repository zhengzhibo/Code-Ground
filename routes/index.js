var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const common = require('../common');

/* GET home page. */
router.get('/', function(req, res) {
  var userInfo = req.session.userInfo;
  var data = {title: 'Code Ground', userInfo, canSave: true};
  res.render('index', data);
});

router.get('/code/:id', function(req, res, next) {
  var id = req.params.id;
  var userInfo = req.session.userInfo;

  let code = db.get('codes')
               .find({id}).value();
  if (code) {
    var canSave = common.codeBelongsToCurrenUser(req, code);
    var data = {title: 'Code Ground', userInfo, code, canSave};
    res.render('index', data);
  } else {
    next(createError(404))
  }
});

router.get('/login', function(req, res, next) {
  var userInfo = req.session.userInfo;
  if (!userInfo) {
    res.redirect(`${common.gitlab.host}/oauth/authorize?client_id=${common.gitlab.appId}&redirect_uri=${common.gitlab.redirectUri}&response_type=code&scope=read_user`);
  } else {
    res.render('logged')
  }
});

router.post('/preview', (req, res) => {
  var {jsLinks, cssLinks} = req.body;
  var jsAry = [];
  var cssAry = [];
  if (jsLinks) {
    jsAry = jsLinks.split(/\r\n/)
  }
  if (cssAry) {
    cssAry = cssLinks.split(/\r\n/)
  }
  res.render('preview', {...req.body, layout: false, jsAry, cssAry})
});

router.get('/preview/:id', (req, res) => {
  let id = req.params.id;
  var code = db.get('codes')
  .find({id})
  .value();

  var {jsLinks, cssLinks} = code;
  var jsAry = [];
  var cssAry = [];
  if (jsLinks) {
    jsAry = jsLinks.split(/\r\n/)
  }
  if (cssAry) {
    cssAry = cssLinks.split(/\r\n/)
  }
  res.render('preview', {...code, layout: false, jsAry, cssAry})
});

module.exports = router;
