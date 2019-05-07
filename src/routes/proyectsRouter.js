'use strict'

// Import modules
const express = require('express');
const router = express.Router();

// Controller
const ProyectsController = require('../controllers/ProyectsController');

// Middlewares
const isAuthenticate = require('../middlewares/isAuthenticate');

router.get('/new', isAuthenticate, ProyectsController.add);
router.get('/edit/:id', isAuthenticate, ProyectsController.edit);

router.route('/')
    .get(ProyectsController.index)
    .post(isAuthenticate, ProyectsController.create);

router.route('/:id')
    .put(isAuthenticate, ProyectsController.find, ProyectsController.update);

module.exports = router;