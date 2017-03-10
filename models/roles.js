var mongoose = require('mongoose');

// Create schema
var rolesSchema  = new mongoose.Schema({
    "nom" : String
});

module.exports = mongoose.model('role',rolesSchema,'roles');
