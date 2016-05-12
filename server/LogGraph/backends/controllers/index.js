var express = require('express');
var router = express.Router();
var logDatabase = require('../services/logDatabase');
// var points = logDatabase.Points();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function (req, res) {

  var j = req.body.points;
  if (j != undefined) {
    
    logDatabase.insert(j,function (result) {
      console.log(result);
    })
  }
  res.send(200);
});

module.exports = router;