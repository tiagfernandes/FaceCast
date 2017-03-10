var mongoose = require('mongoose'), Schema = mongoose.Schema;

// Create schema
var postulationSchema  = new mongoose.Schema({
    "_figurant" : { type: Schema.Types.ObjectId, ref: 'figurant' },
    "_offre" : { type: Schema.Types.ObjectId, ref: 'offre' },
    "etat" : String
});

module.exports = mongoose.model('postulation', postulationSchema,'postulations');