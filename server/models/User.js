'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


var UsersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        index: { unique: true }
    },
    password: String,
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    team: String,
    avatar_url: String

});

//compare password with whats in the db
UsersSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

// presave hook
UsersSchema.pre('save', function saveHook(next) {
    const user = this;
  
    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')) return next();
  
  
    return bcrypt.genSalt((saltError, salt) => {
      if (saltError) { return next(saltError); }
  
      return bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) { return next(hashError); }
  
        // replace a password string with hash value
        user.password = hash;
  
        return next();
      });
    });
  });
  

//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);