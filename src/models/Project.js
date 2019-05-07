'use strict'

// Import Modules
const mongoose = require('mongoose');

// Define Schema
let projectSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        url: String,
        _user: mongoose.Schema.Types.ObjectId
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;