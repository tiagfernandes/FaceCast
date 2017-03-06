var mongoose = require('mongoose');

// Create schema
var eventSchema  = new mongoose.Schema({
    "nom" : String,
    "type" : String,
    "date" : Date,
    "nombreJours" : String
});

module.exports = mongoose.model('event',eventSchema,'events');
