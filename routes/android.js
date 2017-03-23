var express = require('express');
var router = express.Router();
var event = require('../models/event');
var offre = require('../models/offreRoles');
var roles = require('../models/roles');
var postulation = require('../models/postulation');
var figurant = require('../models/figurant');


/* Liste des évènements JSon */
router.get('/events', function(req, res, next) {
    var response = {};

    event.find({},{},function(err,events){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {events};
        }
        //Retourne un tableau de tous les évènements au format json
        res.json(response);
    });
});


/* Liste des offres d'un évènement JSon */
router.get('/event/:id/offre', function(req, res, next) {
    var response = {};
    idEvent = req.params.id;

    //Recherche les offres avec l'id '_event'  
    offre.find({"_event" : idEvent},{},function(err,offres){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {offres};
        }
        //Retourne un tableau de toutes les offres en JSON
        res.json(response);
    }).populate('_role');
    //Le populate est un processus de remplacement automatique des chemins spécifiés
    //dans l'object par des objects provenant d'autres collections
});


/* Liste des rôles JSon */
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


/* Liste des rôles par évènement JSon */
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
    //Le populate est un processus de remplacement automatique des chemins spécifiés
    //dans l'object par des objects provenant d'autres collections
});


/* Détails de l'offre en JSON */
router.get('/offre/:id', function(req, res, next) {
    var response = {};
    idOffre = req.params.id;

    //Recherche une offre correspondante à l'id envoyé
    offre.findOne({"_id" : idOffre},{},function(err,offres){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {offres};
        }
        //Retourne l'offre demandé au format JSON
        res.json(response);
    }).populate('_event').populate('_role');
    //Le populate est un processus de remplacement automatique des chemins spécifiés
    //dans l'object par des objects provenant d'autres collections
});


/* Le figurant postule avec son email à une offre */
router.get('/postule/:idOffre/:email', function(req, res, next) {
    //Récupère les données de l'url
    idOffre = req.params.idOffre;
    emailFigurant = req.params.email;

    //Recherche du figurant avec l'email dans la base de données
    figurant.find({"email" : emailFigurant},{},function(e,docs){
        var id = null;

        docs.forEach(function(doc){
            id=(doc._id);
        });

        //Si aucun figurant trouvé avec email on le créer
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
            //Récupère son id
            id = newFigurant._id;
        }

        //Recherche si la postulation du figurant n'existe pas
        postulation.find({"_figurant": id,"_offre": idOffre},{},function(e,docs){
            var idPost = null;

            docs.forEach(function(doc){
                idPost=(doc._id);
            });

            //Si elle n'existe pas, on créer la postulation
            if(idPost == null){
                //Date actuelle
                var date = new Date();
                var jour = date.getDate();
                var mois = date.getMonth();
                var annee = date.getYear();
                var dateAjout = jour+"/"+mois+"/"+annee;

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
            //Si la postulation existe déjà on ne fait rien
            else{
                res.send("Vous avez déjà postulé !");
            }
        });
    });
});


/* Liste des postulations par figurant (avec email) JSon */
router.get('/postu/:email', function(req, res, next) {
    var response = {};
    emailFigurant = req.params.email;

    //On cherche le figurant correspondant à l'email
    figurant.find({"email" : emailFigurant},{},function(e,docs){
        var id = null;

        docs.forEach(function(doc){
            id=(doc._id);
        });
        
        //On recherche les postulation du figurant avec son id
        postulation.find({ "_figurant" : id},{},function(err, postulations){
            if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {postulations};
            }
            //Retourne les postulations du figurant
            res.json(response);
        }).populate('_figurant')
            .populate({path: '_offre',populate: {path: '_event', model: 'event'}})
            .populate({path: '_offre', populate: {path: '_role' , model: 'role'} });
        //Le populate est un processus de remplacement automatique des chemins spécifiés
        //dans l'object par des objects provenant d'autres collections
    });
});


module.exports = router;
