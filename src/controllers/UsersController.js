'use strict'

// Import modules
const fs = require('fs');
const path = require('path');

// Import models
const Post = require('../models/Post');
const Project = require('../models/Project');
const User = require('../models/User');

// Plugins
const upload = require('../plugins/upload').upload;
const buildParams = require('../plugins/buildParams');

// Valid Params
const VALID_PARAMS = ['name','email','password'];

function add(req, res){
    res.render('users/singup', {
        title: 'Register'
    })
}

function create(req, res, next) {
    const params = buildParams(VALID_PARAMS, req.body);

    if(req.files.photo) {
        params.photo = req.files.photo[0].filename;
    }

    User.create(params)
    .then(user => {
        next();
    })
    .catch(error => {
        new Error(error);
    });

}

async function show(req, res) {
    try {
        const posts =  await Post.find({_user: req.user._id});
        const projects =  await Project.find({_user: req.user._id});
        
        res.render('users/profile', {
            user: req.user,
            posts,
            projects
        });

    }
    catch(error) {
        new Error(error);
    }

}

function getPhoto(req, res, next){    
    const path_file = __dirname + '/../uploads/users/' + req.params.photo;

    fs.exists(path_file, (exist) => {
        if(exist) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.json({message: 'Resource don\'t exist' })
        }
    });
}

function multer() {
    return upload.fields([{ name: 'photo', maxCount: 1 }]);
}

module.exports = { add, create, show, getPhoto, multer };