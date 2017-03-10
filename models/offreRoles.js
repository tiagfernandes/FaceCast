var mongoose = require('mongoose'), Schema = mongoose.Schema;

// Create schema
var offreRolesSchema  = new mongoose.Schema({
    "_event" : { type: Schema.Types.ObjectId, ref: 'event' },
    "_role" : { type: Schema.Types.ObjectId, ref: 'role' },
    "nbRoles" : Number
});

module.exports = mongoose.model('offreRole',offreRolesSchema,'offreRoles');
