'use strict'

// Import modules
const express = require('express');
const router = express.Router();

// Controller
const UsersController = require('../controllers/UsersController');
const SessionsController = require('../controllers/SessionsController');

// Middlewares
const isNotAuthenticate = require('../middlewares/isNotAuthenticate');
const isAuthenticate = require('../middlewares/isAuthenticate');

router.get('/singup', isNotAuthenticate, UsersController.add);
router.post('/singup', isNotAuthenticate, UsersController.multer(), UsersController.create, SessionsController.add);

router.get('/singin', isNotAuthenticate, SessionsController.add);
router.post('/singin', isNotAuthenticate, SessionsController.create());

router.get('/logout', isAuthenticate, SessionsController.destroy);

router.get('/users/get-photo/:photo', UsersController.getPhoto);

router.get('/my', isAuthenticate, UsersController.show)

module.exports = router;