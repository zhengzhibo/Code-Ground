var express = require('express');
var router = express.Router();

const generate = require('nanoid/generate');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function newId() {
  return generate(alphabet, 8);
}

router.post('/', (req, res) => {
  var code = {
    ...req.body,
    owner: req.cookies.userInfo ? req.cookies.userInfo.name : '',
    dateOfCreate: new Date().getTime(),
    id: newId()
  };

  db.get('codes')
  .push(code)
  .last()
  .write()
  .then(code => res.send(code));
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  db.get('codes')
  .find({id})
  .assign(req.body)
  .write()
  .then(code => res.send(code))
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
