'use strict'

// Import Model
import Project from '../models/Project';

// Plugins
import buildParams from '../plugins/buildParams';

// Valid Params
const VALID_PARAMS = ['title', 'description', 'url'];


class ProjectsController {
    constructor() {

    }
/*
    find(req, res, next) {
        Project.findById(req.params.id)
        .then(project => {
            req.PROJECT = project;
            next();
        })
        .catch(error => {
            new Error(error);
        });
    }
    
    index(req, res) {
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
    
    show(req, res) {
    
    }
    
    add(req, res) {
        const project = new Project();
        console.log(project); 
        res.render('proyects/new',{title: 'New Proyect', project});
    }
    
    edit(req, res) {
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
    
    create(req, res) {
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
    
    update(req, res) {
        const params = buildParams(VALID_PARAMS, req.body);
    
        req.PROJECT = Object.assign(req.PROJECT, params);
    
        req.PROJECT.save()
        .then(doc => {
            res.redirect('/my');
        })
        .catch(error => {
            new Error(error);
        });
    }*/
}

const Controller = new ProjectsController(); 

export { ProjectsController, Controller };