var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('facecast');
    
    collection.find({},{},function(e,docs){
        res.render('events', {
            "title" : "Liste des événements",
            "eventlist" : docs
        });
    });
});

router.get('/:id', function(req, res, next) {
    var db = req.db;
    var collection = db.get('facecast');
    
    id = req.params.id;
    
    collection.find({"_id": id},{},function(e,docs){
        res.render('event', {
            "title" : "Evénement",
            "eventlist" : docs
        });
    });
});

module.exports = router;
