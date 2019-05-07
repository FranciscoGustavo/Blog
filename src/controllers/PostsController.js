'use strict'

// Import Modules
const fs = require('fs');
const path = require('path');
const showdown = require('showdown');

// Import Model
const Post = require('../models/Post');

// Plugins
const buildParams = require('../plugins/buildParams');
const upload = require('../plugins/upload').uploadPosts;

// Valid Params
const VALID_PARAMS = ['title','color','body']

// Converter markdown
const converter = new showdown.Converter({
    tables: true,
    tablesHeaderId: true
});

function find(req, res, next) {
    Post.findOne({slug: req.params.slug}).populate({ path: '_user'})
    .then(post => {
        req.POST = post;
        next();
    })
    .catch(error => {

    });
}

function index(req, res) {
    Post.find()
    .then(posts => {
        res.render('blog/index', {
            title: 'My Blog',
            blog: true,
            posts
        });
    })
    .catch(error => {
        new Error(error);
    });
}

function show(req, res) {
    const body = converter.makeHtml(req.POST.body);
    
    res.render('blog/show',{
        post: req.POST,
        blog: true,
        body
    });
}

function add(req, res) {
    const post = new Post();
    res.render('blog/new', {
        title: 'New post',
        post
    })
}

function edit(req, res) {
    Post.findOne({slug: req.params.slug})
    .then(post => {
        res.render('blog/edit', {
            post
        });
    })
    .catch(error => {
        new Error(error);
    });
}

function create(req, res) {
    let params = buildParams(VALID_PARAMS, req.body);

    params.image = req.files.image[0].filename;
    params.cover = req.files.cover[0].filename;
    params._user = req.user._id;
    console.log(req.files);
    Post.create(params)
    .then(post => {
        res.redirect('/my');
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    })

}

function update(req, res) {
    const params = buildParams(VALID_PARAMS, req.body);
    const cover = req.POST.cover;
    const image = req.POST.image;
    const file_path_image = __dirname + '/../uploads/posts/' + image;
    const file_path_cover = __dirname + '/../uploads/posts/' + cover;

    req.POST = Object.assign(req.POST, params);

    if(req.files.image) {
        req.POST.image = req.files.image[0].filename
        fs.unlinkSync(file_path_image);
    }

    if(req.files.cover) {
        req.POST.cover = req.files.cover[0].filename
        fs.unlinkSync(file_path_cover);
    }

    req.POST.save()
    .then(post => {
        res.redirect('/my');
    })
    .catch(error => {
        new Error(error);
    });
;}

function getCover(req, res) {
    const path_file = __dirname + '/../uploads/posts/' + req.params.cover;

    fs.exists(path_file, (exist) => {
        if(exist) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.json({message: 'Resource don\'t exist' })
        }
    });
}

function getImage(req, res) {
    const path_file = __dirname + '/../uploads/posts/' + req.params.image;

    fs.exists(path_file, (exist) => {
        if(exist) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.json({message: 'Resource don\'t exist' })
        }
    });
}

function multer() {        
    return upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cover', maxCount: 1 }])
}

module.exports = { find, index, show, add, edit, create, update, multer, getCover, getImage };