var LocalStrategy   = require('passport-local').Strategy;
var fbStrategy=require('passport-facebook').Strategy;
var secrets=require('./secrets.json');

var User            = require('../app/models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) { //determines which data of user should be stored in session
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) { //get user back from the the key stored in session
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({ //localstrategy for signup
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {


                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        var newUser            = new User();

                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

        })
    );

    passport.use('local-login', new LocalStrategy({ //localstrategy for login
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req,email,password,done)=>{
            User.findOne({'local.email':email},(err,user)=>{
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Wrong password'));

                return done(null, user);
            })
        }
    )
    );

    passport.use(new fbStrategy({
        clientID:secrets.fb.clientID,
        clientSecret:secrets.fb.clientSecret,
        callbackURL:secrets.fb.callbackURL
    },(token,refreshToken,profile,done)=>{
        User.findOne({'fb.id':profile.id},(err,user)=>{
            if (err)
            {
                return done(err);
            }

            if(user)
            {
                return done(null,user);
            }
            else
            {
                var newUser=new User();
                newUser.fb.id=profile.id;
                newUser.fb.token=token;
                newUser.fb.name=profile.name.givenName+' '+profile.name.familyName;
                newUser.fb.email=profile.emails[0].value;

                newUser.save((err)=>{
                    if (err)
                        throw err;
                    return done(null,newUser);

                })
            }



        });

    }))




    };
