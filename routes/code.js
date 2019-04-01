var express = require('express');
var shortid = require('shortid');

var router = express.Router();

router.post('/preview', (req, res) => {
  let {js, css, html} = req.body;
  res.send(`<html><script>${js}</script><style>${css}</style><body>${html}</body></html>`)
});

router.post('/', (req, res) => {
  db.get('codes')
  .push(req.body)
  .last()
  .assign({id: shortid.generate()})
  .write()
  .then(code => res.send(code))
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
  res.send(data);
});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  let data = db.get('codes')
               .remove({id})
               .write()
               .then(code => res.send(code));
});

module.exports = router;
