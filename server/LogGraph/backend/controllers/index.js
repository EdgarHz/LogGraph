var express = require('express');
var router = express.Router();
var LogGraph = require('../services/logDatabase');

/* GET home page. */
router.get('/', function(req, res, next) {
  var tagName = req.body.tagName;
  res.render('index', {tag:tagName});
});


router.post('/', function (req, res) {
  var tagName = req.body.tagName;
  var j = req.body.points;
  if (j != undefined) {
    LogGraph.insert(tagName,j,function (result) {
      console.log(result);
    })
  }
  res.send(200);
});
router.get('/find', function (req, res) {
  var tagName = req.query.tagName;
    LogGraph.find(tagName,function (result) {
      res.send(result);
    });
});

module.exports = router;