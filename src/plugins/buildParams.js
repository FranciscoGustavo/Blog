'use strict'

// Build an object with accepted parameters
function buildParams (validParams, body) {
    let params = {}
            
    validParams.forEach(attr => {
        if(Object.prototype.hasOwnProperty.call(body,attr))
            params[attr] = body[attr]
    })

    return params
}

module.exports = buildParams;