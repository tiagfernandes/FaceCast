var mongoose = require('mongoose');

// Create schema
var eventSchema  = new mongoose.Schema({
    "nom" : String,
    "type" : String,
    "date" : String,
    "nombreJours" : String
});

// modele 
module.exports = mongoose.model('event',eventSchema,'events');
