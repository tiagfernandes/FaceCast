var express = require('express');
var router = express.Router();
var roles = require('../models/roles');

/* GET home page. */
router.get('/', function(req, res, next) {    
    roles.find({},{},function(e,docs){
        res.render('roles', {
            "title" : "Liste des rôles",
            "rolesliste" : docs
        });
    });
});

router.post('/add', function(req, res) {
    // Valeurs du formulaire
    var roleName = req.body.name;

    var newRole = new roles({
        "nom" : roleName
    });

    newRole.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas de roles !");
        }
        else {

            res.redirect("/roles");
        }
    });
});

module.exports = router;
