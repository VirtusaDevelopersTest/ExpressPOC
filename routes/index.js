var express = require('express');
var router = express.Router();
var cassandra = require("cassandra-driver");

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function (err, result) {
    console.log('index  : casssandra connected');
});

var getAllServices = 'select * from services_ks.services';

/* GET home page. */
router.get('/', function(req, res, next) {
  client.execute(getAllServices,[],function (err, result) {
      if (err) {
      res.status(404).send({msg: err});
      }
      else {
        res.render('index',{
          services : result.rows
        });
      }
  });
});

module.exports = router;
