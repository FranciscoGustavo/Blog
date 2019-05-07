'use strict'

// Import modules
const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

let usersSchema = mongoose.Schema({
    photo: String,
    name: String,
    email: String,
},{
    timestamps: true
})

usersSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', usersSchema);

module.exports = User;