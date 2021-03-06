var express = require('express');
var router = express.Router();
var event = require('../models/event');


/* Home page ajout évènement */
router.get('/', function(req, res, next) {
    res.render('insert', {
        "title" : "Ajout évènement"
    });
});


/* Ajout d'un évènement */
router.post('/add', function(req, res) {
    //Récupère les valeurs du formulaire
    var eventName = req.body.name;
    var eventType = req.body.type;
    var eventDate = req.body.date;
    var eventnbJours = req.body.nbJours;

    var newEvent = new event({
        "nom" : eventName,
        "type" : eventType,
        "date" : eventDate,
        "nombreJours" : eventnbJours
    });

    newEvent.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas d'event !");
        }
        else {
            // Redirection vers la liste
            res.redirect("/events");
        }
    });
});


module.exports = router;
