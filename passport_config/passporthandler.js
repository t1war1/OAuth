const passport=require('passport');
const LocalLoginStrategy=require('./passport_strategies/loginlocal');
const LocalSignupStrategy=require('./passport_strategies/Signup')

passport.use('local-signup',LocalSignupStrategy);
passport.use('local-login',LocalLoginStrategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports=passport;