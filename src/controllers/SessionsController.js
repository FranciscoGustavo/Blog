'use strict'

// Import modules
const passport = require('passport');

function add(req, res) {
    res.render('users/singin', {
        title: 'Iniciar sesión'
    })
}

function create(req, res) {
    return passport.authenticate('local-singin', {
        successRedirect: '/',
        failureRedirect: '/singin',
        failureFlash: true
    });
}

function destroy(req, res) {
    req.logout();
    res.redirect('/');
}

module.exports = { add, create, destroy };