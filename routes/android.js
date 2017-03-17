var express = require('express');
var router = express.Router();
var event = require('../models/event');
var offre = require('../models/offreRoles');
var roles = require('../models/roles');
var postulation = require('../models/postulation');
var figurant = require('../models/figurant');

/* Liste des evenement JSon */
router.get('/events', function(req, res, next) {
    var response = {};

    event.find({},{},function(err,events){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {events};
        }

        res.json(response);
    });
});

/* Liste des offre par evenement JSon */
router.get('/event/:id/offre', function(req, res, next) {
    var response = {};
    idEvent = req.params.id;

    offre.find({"_event" : idEvent},{},function(err,offres){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {offres};
        }

        res.json(response);
    }).populate('_role');
});

/* Liste des roles JSon */
router.get('/roles', function(req, res, next) {
    var response = {};

    roles.find({},{},function(err,roles){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {roles};
        }

        res.json(response);
    });
});

/* Liste des roles par evenement JSon */
router.get('/roles/:id/offre', function(req, res, next) {
    var response = {};
    idRole = req.params.id;

    offre.find({"_role" : idRole},{},function(err,offres){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {offres};
        }

        res.json(response);
    }).populate('_event');
});

/* L'offre JSon */
router.get('/offre/:id', function(req, res, next) {
    var response = {};
    idOffre = req.params.id;

    offre.findOne({"_id" : idOffre},{},function(err,offres){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {offres};
        }

        res.json(response);
    }).populate('_event').populate('_role');
});

/* Postule */
router.get('/postule/:idOffre/:email', function(req, res, next) {
    idOffre = req.params.idOffre;
    emailFigurant = req.params.email;

    figurant.find({"email" : emailFigurant},{},function(e,docs){
        var id = null;

        docs.forEach(function(doc){
            id=(doc._id);
        });

        //Si aucun figurant trouvé avec email on le creer
        if(id == null){
            var newFigurant = new figurant({
                "email" : emailFigurant
            });

            newFigurant.save( function (err, doc) {
                if (err) {
                    // Retour d'une erreur
                    res.send(err);
                }
            });
            id = newFigurant._id;
        }

        postulation.find({"_figurant": id,"_offre": idOffre},{},function(e,docs){
            var idPost = null;

            docs.forEach(function(doc){
                idPost=(doc._id);
            });
            
            var date = new Date();
            var jour = date.getDate();
            var mois = date.getMonth();
            var annee = date.getYear();
            var dateAjout = jour+"/"+mois+"/"+annee;

            if(idPost == null){
                var newPostulation = new postulation({
                    "_figurant" : id,
                    "_offre" : idOffre,
                    "etat" : "En attente",
                    "dateAjout" : dateAjout
                }); 

                newPostulation.save( function (err, doc) {
                    if (err) {
                        // Retour d'une erreur
                        res.send("Postulation refusé");
                    }else {
                        res.send("Validé !");
                    }
                });
            }
            else{
                res.send("Vous avez déjà postulé !");
            }
        });
    });
});

/* Liste des postulation JSon */
router.get('/postu/:email', function(req, res, next) {
    var response = {};
    emailFigurant = req.params.email;

    figurant.find({"email" : emailFigurant},{},function(e,docs){
        var id = null;

        docs.forEach(function(doc){
            id=(doc._id);
        });

        postulation.find({ "_figurant" : id},{},function(err, postulations){
            if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {postulations};
            }

            res.json(response);
        }).populate('_figurant')
            .populate({path: '_offre',populate: {path: '_event', model: 'event'}})
            .populate({path: '_offre', populate: {path: '_role' , model: 'role'} });
    });
});

module.exports = router;
