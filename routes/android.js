var express = require('express');
var router = express.Router();
var event = require('../models/event');

/* Liste des utilisateurs par JSon */
router.get('/', function(req, res, next) {
  var response = {};
 
  event.find({},function(err,data){
   if (err) {
    response = {"error" : true,"message" : "Error fetching data"};
   } else {
     response = {data};
    }

   res.json(response);
  });
});

module.exports = router;
