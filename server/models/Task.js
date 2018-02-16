var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TasksSchema = new Schema({
    milestone_id: { type: Schema.Types.ObjectId, ref: 'Milestone' },
    display_name: String,
    status: String
});
//export our module to use in server.js
module.exports = mongoose.model('Task', TasksSchema);