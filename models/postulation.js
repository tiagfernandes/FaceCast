var mongoose = require('mongoose'), Schema = mongoose.Schema;

// Create schema
var postulationSchema  = new mongoose.Schema({
    "_figurant" : { type: Schema.Types.ObjectId, ref: 'figurant' },
    "_offre" : { type: Schema.Types.ObjectId, ref: 'offreRole' },
    "etat" : String,
    "dateAjout" : String
});

module.exports = mongoose.model('postulation', postulationSchema,'postulations');