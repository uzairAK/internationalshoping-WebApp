'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err,user);
    });
});

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
    User.findOne({'email': email}, (err, user) => {
        if (err) {
            return done(err);
        }
        
        if (user) {
            return done(null, false, req.flash('error', 'User with email already exist'));
        }

        const newUser = new User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.type = req.body.type;
        newUser.isApproved = true;
        
        //create random 16 character token
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var token = '';
            for (var i = 16; i > 0; --i) {
              token += chars[Math.round(Math.random() * (chars.length - 1))];
            }

        // create expiration date
        var expires = new Date();
        expires.setHours(expires.getHours() + 6);

        newUser.resetToken = {
          token: token,
          expires: expires
        };
        newUser.password = newUser.encryptPassword(req.body.password);
        
        newUser.save((err) => {
            done(null, newUser);
        });
        
    });
    
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
    User.findOne({'email': email}, (err, user) => {
        if(err){
           return done(err);
        }
        
        const messages = [];
        if(!user || !user.validUserPassword(password)){
            messages.push('Email Does Not Exist or Password is Invalid');
            return done(null, false, req.flash('error', messages));
        }
        
        return done(null, user);
    });
}));

passport.use('admin.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
    User.findOne({'email': email}, (err, user) => {
        if (err) {
            return done(err);
        }
        
        if (user) {
            return done(null, false, req.flash('error', 'Admin with email already exist'));
        }
        
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.isAdmin = true;
        newUser.isApproved = false;
        
        newUser.save((err) => {
            done(null, newUser);
        });
        
    });
    
}));

passport.use('admin.local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
    User.findOne({'email': email}, (err, user) => {
        if(err){
           return done(err);
        }
        
        const messages = [];
        if(!user || !user.validUserPassword(password)){
            messages.push('Email Does Not Exist or Password is Invalid');
            return done(null, false, req.flash('error', messages));
        }
        
        return done(null, user);
    });
}));

module.exports = passport;