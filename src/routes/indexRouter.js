'use strict'

// Import modules
const express = require('express');
const router = express.Router();

// Controller
const IndexController = require('../controllers/IndexController');

router.get('/', IndexController.index);
router.get('/contact', IndexController.contact);

module.exports = router;