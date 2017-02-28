var express = require('express');
var router = express.Router();

/* Liste des utilisateurs */
router.get('/', function(req, res, next) {
   var db = req.db;
   var collection = db.get('facecast');
   collection.find({},{},function(e,docs){
      res.render('insertEvent', {
         "title" : "Ajout utilisateur"
      });
   });
});

/* Ajout d'un utilisateur, pas GET mais POST cette fois et sur l'URL de la méthode pour le routage */
router.post('/add', function(req, res) {
   // Positionnement de la variable base de donnée
   var db = req.db;

   // Récupération des valeurs du formulaire
   var eventName = req.body.name;
   var eventType = req.body.type;
   var eventDate = req.body.date;
   var eventnbJours = req.body.nbJours;

   // Positionnement de la collection
   var collection = db.get('facecast');

   // Soumission de l'utilisateur à la base
   collection.insert({
      "nom" : eventName,
      "type" : eventType,
      "date" : eventDate,
      "nombreJours" : eventnbJours
   }, function (err, doc) {
      if (err) {
         // Retour d'une erreur
         res.send("Pas glop !");
      }
      else {
         // Redirection vers la liste, donc vers une vue existante
         res.redirect("/event");
      }
   });
});

module.exports = router;
