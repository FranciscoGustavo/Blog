'use strict'

// Import Model
const Project = require('../models/Project');

// Plugins
const buildParams = require('../plugins/buildParams');

// Valid Params
const VALID_PARAMS = ['title', 'description', 'url'];

function find(req, res, next) {
    Project.findById(req.params.id)
    .then(project => {
        req.PROJECT = project;
        next();
    })
    .catch(error => {
        new Error(error);
    });
}

function index(req, res) {
    Project.find()
    .then(posts => {
        res.render('proyects/index', {
            title: 'My Proyects',
            proyects: true,
            posts
        });
    })
    .catch();
}

function show(req, res) {

}

function add(req, res) {
    const project = new Project();
    console.log(project); 
    res.render('proyects/new',{title: 'New Proyect', project});
}

function edit(req, res) {
    Project.findById(req.params.id)
    .then(project => {
        res.render('proyects/edit', {
            project
        });
    })
    .catch(error => {
        new Error(error);
    });
}

function create(req, res) {
    let params = buildParams(VALID_PARAMS, req.body);

    params._user = req.user._id;

    Project.create(params)
    .then(project => {
        res.redirect('/my');
    })
    .catch(error => {
        new Error(error);
    });
}

function update(req, res) {
    const params = buildParams(VALID_PARAMS, req.body);

    req.PROJECT = Object.assign(req.PROJECT, params);

    req.PROJECT.save()
    .then(doc => {
        res.redirect('/my');
    })
    .catch(error => {
        new Error(error);
    });
}

module.exports = { index, show, add, edit, create, find, update };