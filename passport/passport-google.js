'use strict';

const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var GooglePlusTokenStrategy = require('passport-google-plus-token').Strategy;
//const GooglePlusTokenStrategy = require('passport-oauth2');
const secret = require("../secret/secretFile");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use("google-plus-token", new GoogleStrategy({
    clientID: secret.google.clientID,
    clientSecret: secret.google.clientSecret,
//    "authorizationURL":"https://accounts.google.com/o/oauth2/auth",
//    "tokenURL":"https://www.googleapis.com/oauth2/v3/token",
//    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    callbackURL: 'https://medical-researcher.herokuapp.com/auth/google/callback',
    passReqToCallback: true
    
}, (req, accessToken, refreshToken, profile, done) => {
//    process.nextTick(function () {
//        console.log(profile);
//      return done(null, profile);
//    });
    User.findOne({google:profile.id}, (err, user) => {
        if(err){
           return done(err);
        }
        
        if(user){
            return done(null, user);
        } else{
            const newUser = new User();
            newUser.google = profile.id;
            newUser.name = profile.displayName;
            newUser.type = req.body.type;
            newUser.isApproved = req.body.isApproved;
            newUser.username = profile.displayName;
            newUser.email = profile.emails[0].value;
            var newSize="300"
            var str = profile._json.image.url;
            var res = str.split("?sz=50")[0]+"?sz="+newSize;
            newUser.userImage = res;
            
            newUser.save((err) => {
                if(err){
                    return done(err)
                }
                return done(null, newUser);
            })
        }
    })
//    User.Create({'google.id': profile.id}, function(error, user) {
//        console.log(user);
//        return next(error, user);
//    });
}));

module.exports = passport;

