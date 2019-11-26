'use strict';


//module.exports.SignUpValidation = function(req,res,next) {
//            req.checkBody('username', 'Username is Required').notEmpty();
//            req.checkBody('username', 'Username Must Not Be Less Than 5').isLength({min: 5});
//            req.checkBody('email', 'Email is Required').notEmpty();
//            req.checkBody('email', 'Email is Invalid').isEmail();
//            req.checkBody('password', 'Password is Required').notEmpty();
//            req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min: 5});
//            
//            req.getValidationResult()
//                .then((result) => {
//                    const errors = result.array();
//                    const messages = [];
//                    errors.forEach((error) => {
//                        messages.push(error.msg);
//                    });
//                
//                    req.flash('error', messages);
//                    res.redirect('/signup');
//                })
//                .catch((err) => {
//                    next();
//                })
//}
module.exports =
     {
        SignUpValidation: (req, res, next) => {
            req.checkBody('username', 'Username is Required').notEmpty();
            req.checkBody('username', 'Username Must Not Be Less Than 5').isLength({min: 5});
            req.checkBody('email', 'Email is Required').notEmpty();
            req.checkBody('email', 'Email is Invalid').isEmail();
            req.checkBody('password', 'Password is Required').notEmpty();
            req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min: 5});
            
            req.getValidationResult()
                .then((result) => {
                    const errors = result.array();
                    const messages = [];
                    errors.forEach((error) => {
                        messages.push(error.msg);
                    });
                
                    req.flash('error', messages);
                    res.redirect('/signup');
                })
                .catch((err) => {
                    next();
                })
        },
        
        LoginValidation: (req, res, next) => {
            req.checkBody('email', 'Email is Required').notEmpty();
            req.checkBody('email', 'Email is Invalid').isEmail();
            req.checkBody('password', 'Password is Required').notEmpty();
            req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min: 5});
            
            req.getValidationResult()
                .then((result) => {
                    const errors = result.array();
                    const messages = [];
                    errors.forEach((error) => {
                        messages.push(error.msg);
                    });
                
                    req.flash('error', messages);
                    res.redirect('/login');
                })
                .catch((err) => {
                    next();
                })
        },
        isLoggedIn: function  (req, res, next){
            if (req.isAuthenticated()){
                return next();
            }
            res.redirect("/login");
        },
        isApproved: function  (req, res, next){
            if (req.user.isApproved == true){
                return next();
            }
            res.redirect(`/approved`);
        }
    }

