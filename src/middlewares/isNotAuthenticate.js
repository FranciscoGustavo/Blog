'use strict'

function isNotAuthenticated(req, res, next) {
    if(!req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/my');
}

module.exports = isNotAuthenticated;