var express = require('express');
var router = express.Router();
var event = require('../models/event');
var roles = require('../models/roles');
var offreRoles = require('../models/offreRoles');
var postulation = require('../models/postulation');


/* GET home page, liste des évènements existant */
router.get('/', function(req, res, next) {    
    event.find({},{},function(e,docs){
        res.render('events', {
            "title" : "Liste des événements",
            "eventlist" : docs
        });
    });
});


/* GET l'évènement par son id */
router.get('/:id', function(req, res, next) {    
    id = req.params.id;

    event.find({"_id": id},{},function(e,eventDocs){
        roles.find({},{},function(e,roleDocs){
            offreRoles.find({"_event" : id},{},function(e,offreDocs){
                res.render('event', {
                    "title" : "Evénement",
                    "eventlist" : eventDocs,
                    "roleslist" : roleDocs,
                    "offrelist" : offreDocs
                })    
            }).populate('_event')
                .populate('_role');
            //Le populate est un processus de remplacement automatique des chemins spécifiés
            //dans l'object par des objects provenant d'autres collections
        });
    });
});


/* Ajout d'un rôle à un évènement */
router.post('/:id/role/add', function(req, res) {
    //Récupère l'id en paramètre dans l'url
    id = req.params.id;

    //Récupère les valeurs du formulaire
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


/* Delete évènement par son id */
router.get('/delete/:id', function(req, res, next) {    
    id = req.params.id;

    //Récupère les id des offres liés à l'évènement pour supprimer les postulation liés avec ces offres
    offreRoles.find({"_event" : id},{},function(e,offreDocs){
        var arrayIdOffre = [];

        for(var i = 0; offreDocs.length > i; i++){
            arrayIdOffre.push(offreDocs[i]._id);
        }

        event.remove({ "_id": id }, function (err) {
            postulation.remove({ "_offre": { $in: arrayIdOffre } }, function (err) {
                offreRoles.remove({ "_event": id }, function (err) {
                    if (err) return handleError(err);
                    res.redirect("/events");
                });
            });
        });
    });
});


/* Delete offre lié à l'évènement */
router.get('/delete/:id/offre/:idOffre', function(req, res, next) {    
    id = req.params.id;
    idOffre = req.params.idOffre;

    postulation.remove({ "_offre": idOffre }, function (err) {
        offreRoles.remove({ "_id" : idOffre, "_event" : id }, function (err) {
            if (err) return handleError(err);
            res.redirect("/events/"+id);
        });
    });
});


module.exports = router;
