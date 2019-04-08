var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const config = require('../config');

/* GET home page. */
router.get('/', function(req, res) {
  var data = {title: 'Code Ground', userInfo: req.session.userInfo};
  res.render('index', data);
});

router.get('/login', function(req, res, next) {
  var userInfo = req.session.userInfo;
  if (!userInfo) {
    res.redirect(`${config.gitlab.host}/oauth/authorize?client_id=${config.gitlab.appId}&redirect_uri=${config.gitlab.redirectUri}&response_type=code&scope=read_user`);
  } else {
    res.render('logged')
  }
});

router.get('/code/:id', function(req, res, next) {
  var id = req.params.id;
  let code = db.get('codes')
               .find({id}).value();

  if (code) {
    var data = {title: 'Code Ground', userInfo: req.session.userInfo, code};
    res.render('index', data);
  } else {
    next(createError(404))
  }
});

router.post('/preview', (req, res) => {
  let {js, css, html} = req.body;
  res.send(`<html><script>${js}</script><style>${css}</style><body>${html}</body></html>`)
});

module.exports = router;
