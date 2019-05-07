'use strict'

// Import modules
const express = require('express');
const router = express.Router(); 

// Controller
const PostsController = require('../controllers/PostsController');

// Middleawares
const isAuthenticate = require('../middlewares/isAuthenticate');

router.get('/new', isAuthenticate, PostsController.add);
router.get('/edit/:slug', isAuthenticate, PostsController.edit);
router.get('/get-cover/:cover', PostsController.getCover);
router.get('/get-image/:image', PostsController.getImage);

router.route('/')
    .get(PostsController.index)
    .post(
        isAuthenticate, 
        PostsController.multer(),
        PostsController.create);

router.route('/:slug')
    .get(PostsController.find, PostsController.show)
    .post(PostsController.multer(), PostsController.find, PostsController.update)
    
   

module.exports = router;