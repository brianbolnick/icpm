'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TodosSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
    priority: Number,
    deadline: Date
});
//export our module to use in server.js
module.exports = mongoose.model('Todo', TodosSchema);