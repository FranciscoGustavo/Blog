'use strict'

// Import Model
const Project = require('../models/Project');

function index(req, res) {
    Project.find()
    .then(projects => {
        res.render('index', {
            title: 'Home',
            home: true,
            projects
        });
    })
    .catch(error => {
        new Error(error);
    });
}

function contact(req, res) {
    res.render('contact', {
        title: 'Contacto',
        contact: true
    });
}

module.exports = { index, contact };