'use strict'

// Import modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import model
const User = require('../models/User');

// Config
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})

// Strategy
passport.use(
    'local-singin',
    new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        async (req, email, password, done) => {
            // Search user
            const user = await User.findOne({email});

            // Validate that exist
            if(!user) return done(null, false, req.flash('signinMessage', 'No User Found'));
            
            // Validate Password
            const isValid = await user.verifyPassword(password);

            // If don't is valid
            if(!isValid) return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
        
            // If is valid
            return done(null, user);
        }

    )
);