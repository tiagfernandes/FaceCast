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


// Changer l'etat   

router.post('/update/:id',function(req, res, next) {
    id = req.params.id;
    etat = req.body.etat;
    
    postulation.findOneAndUpdate({"_id": id},{ $set:{ "etat": etat} }, function(e,docs){
        if(e){
            res.status(500).send(e);  
        }
        else{       
            // Redirection vers la liste
            res.redirect("/postulations");
        }
    });
});


module.exports = router;
