'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UsersSchema = new Schema({
    _id: Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    projects:  [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    todos:  [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    team: String,
    avatar_url: String

});
//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);