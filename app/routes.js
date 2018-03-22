module.exports = function(app, passport) {


    app.get('/', function(req, res) {
        res.render('index.hbs');
    });

    app.get('/login', function(req, res) {

        res.render('login.hbs', { message: req.flash('loginMessage') });
    });

    app.get('/signup', function(req, res) {

        res.render('signup.hbs', { message: req.flash('signupMessage') });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.hbs', {
            user : req.user
        });
    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login',
        failureRedirect : '/signup',
        failureFlash : true // to enable messages on failure
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/auth/facebook',passport.authenticate('facebook',{
        scope:['public_profile','email']
    }))

    app.get('/auth/facebook/callback',passport.authenticate('facebook',{
        successRedirect:'/profile',
        failureRedirect:'/'
    }))
};

function isLoggedIn(req, res, next) {  //to check if user is logged in when user directly jumps to /profile

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}