'use strict'

function error(error, req, res, next) {
    
    console.log('You are here');
    
    res.json({hi:'Hola', error});
}

module.exports = error;