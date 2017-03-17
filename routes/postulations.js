var express = require('express');
var router = express.Router();
var postulation = require('../models/postulation');

/* GET home page. */
router.get('/', function(req, res, next) {    
    postulation.find({},{},function(e,docsPostulation){
        res.render('postulations', {
            "title" : "Liste des postulations",
            "postulationlist" : docsPostulation
        });
    }).populate('_figurant')
        .populate({path: '_offre',populate: {path: '_event', model: 'event'}})
        .populate({path: '_offre', populate: {path: '_role' , model: 'role'} });
});



module.exports = router;
