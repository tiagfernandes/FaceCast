var express = require('express');
var router = express.Router();
var event = require('../models/event');

/* GET home page. */
router.get('/', function(req, res, next) {    
    event.find({},{},function(e,docs){
        res.render('events', {
            "title" : "Liste des événements",
            "eventlist" : docs
        });
    });
});

router.get('/:id', function(req, res, next) {    
    id = req.params.id;
    
    event.find({"_id": id},{},function(e,docs){
        res.render('event', {
            "title" : "Evénement",
            "eventlist" : docs
        });
    });
});

module.exports = router;
