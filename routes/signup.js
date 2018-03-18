const route=require('express').Router();
const passport=require('../passport_config/passporthandler')

route.get('/',(req,res)=>{
    res.render('signup',{});
});

route.post('/', passport.authenticate('local-signup', {
    successRedirect : '/login',
    failureRedirect : '/signup',
    failureFlash : true
}));

module.exports=route