'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContactsSchema = new Schema({
    project_id: { type: Schema.Types.ObjectId, ref: 'Project' },
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    role: String
});
//export our module to use in server.js
module.exports = mongoose.model('Contact', ContactsSchema);