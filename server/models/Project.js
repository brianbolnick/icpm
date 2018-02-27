'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    csm: String,
    end_date: Date,
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
    status: String,
    imp_package: String,
    sis: String,
    auth_type: String,
    legacy_lms: String,
    support_package: String,
    instance_url: String,
    drive_url: String, 
    milestones: {
        sis: { type: Schema.Types.ObjectId, ref: 'Task' },
        authentication: { type: Schema.Types.ObjectId, ref: 'Task' },
        branding: { type: Schema.Types.ObjectId, ref: 'Task' },
        migration: { type: Schema.Types.ObjectId, ref: 'Task' },
        other: { type: Schema.Types.ObjectId, ref: 'Task' },
    },
    field_admins: []
});
//export our module to use in server.js
module.exports = mongoose.model('Project', ProjectsSchema);