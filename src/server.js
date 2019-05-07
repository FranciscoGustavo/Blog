'use strict'

// Import App
const app = require('./app');
const Server = app;

Server.listen(app.get('port'), () => {

    console.log('App is runing in port:', app.get('port'));
    
});