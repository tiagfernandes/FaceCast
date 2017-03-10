var mongoose = require('mongoose');

// Create schema
var figurantSchema  = new mongoose.Schema({
    "nom" : String,
    "prenom" : String,
    "email" : { type: String, index: { unique : true } }
});

module.exports = mongoose.model('figurant',figurantSchema,'figurants');