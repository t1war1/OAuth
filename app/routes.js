module.exports = function(app, passport) {


    app.get('/', function(req, res) {
        res.render('index.hbs'); // load the index.ejs file
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
        failureFlash : true
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}