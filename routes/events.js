var express = require('express');
var router = express.Router();
var event = require('../models/event');
var roles = require('../models/roles');
var offreRoles = require('../models/offreRoles');

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
        roles.find({},{},function(e,roleDocs){
            offreRoles.find({"_event" : id},{},function(e,offreDocs){
                res.render('event', {
                    "title" : "Evénement",
                    "eventlist" : docs,
                    "roleslist" : roleDocs,
                    "offrelist" : offreDocs
                })    
            }).populate('_event').populate('_role');
        });
    });

});

//Add role to event
router.post('/:id/role/add', function(req, res) {
    id = req.params.id;

    // Valeurs du formulaire
    var roleId = req.body.roleId;
    var roleNbFigurant = req.body.nbFigurant;
    
    var newOffreRoles = new offreRoles({
        "_event" : id,
        "_role" : roleId,
        "nbRoles" : roleNbFigurant
    });

    newOffreRoles.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas d'event !");
        }
        else {
            // Redirection vers la liste
            res.redirect("/events/"+id);
        }
    });
});

module.exports = router;
