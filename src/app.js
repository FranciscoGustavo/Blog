'use strict'

// Import modules
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('express-method-override')('_method');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');

// Load DataBase
const dataBase = require('./config/databse');

// Load Routes
const indexRouter = require('./routes/indexRouter');
const postsRouter = require('./routes/postsRouter');
const proyectsRouter = require('./routes/proyectsRouter');
const usersRouter = require('./routes/usersRouter');
const errorRouter = require('./routes/errorRouter');

// Define variables
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = express.static(__dirname + '/public');

// Define app
const app = express();
dataBase.connect();
require('./passport/localAuth');

// Set variables
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use( morgan('dev') );
app.use( express.json() );
app.use( express.urlencoded({extended: false}) );
app.use( methodOverride );
app.use( PUBLIC_DIR );

app.use(
    session({
        secret: 'bihjbidjbvjis',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            url: dataBase.MONGO_URI,
            autoReconnect: true
        })
    })
);

app.use( flash() );
app.use( passport.initialize() );
app.use( passport.session() );

app.use( (req, res, next) => {
    app.locals.singinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    
    next();
});

//Routes
app.use( indexRouter );
app.use( usersRouter );
app.use( '/blog', postsRouter );
app.use( '/projects', proyectsRouter );
//app.use( errorRouter );

module.exports = app;