var express = require('express');
var router = express.Router();
var common = require('../common')
var createError = require('http-errors');

const generate = require('nanoid/generate');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function newId() {
  return generate(alphabet, 8);
}

router.post('/', (req, res) => {
  var userInfo = req.session.userInfo;
  var id = newId();
  var code = {
    ...req.body,
    author: userInfo ? userInfo.meta.uid : '',
    dateOfCreate: new Date().getTime(),
    id
  };

  if (!userInfo) {
    if (!req.session.ownAnonymousCode) {
      req.session.ownAnonymousCode = [];
    }

    req.session.ownAnonymousCode.push(id)
  }

  db.get('codes')
  .push(code)
  .last()
  .write()
  .then(code => res.send(code));
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let code = db.get('codes')
  .find({id})
  .value();

  if (common.codeBelongsToCurrenUser(req, code)) {
    db.get('codes')
    .find({id})
    .assign(req.body)
    .assign({author: req.session.userInfo ? req.session.userInfo.meta.uid : '',})
    .write()
    .then(code => res.send(code))
  } else {
    next(createError(401))
  }
});

router.get('/', function(req, res, next) {
  var id = req.params.id;
  let data = db.get('codes').map(code => {return {name: code.name, id: code.id}}).value();
  res.send(data);
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  let data = db.get('codes')
               .find({id}).value();
  if (data) {
    res.send(data);
  } else {
    res.statusCode = 404;
    res.send()
  }
});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  let data = db.get('codes')
               .remove({id})
               .write()
               .then(code => res.send(code));
});

module.exports = router;
