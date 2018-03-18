const route=require('express').Router();
const passport=require('../passport_config/passporthandler')

route.get('/',(req,res)=>{
    res.render('login',{})
});

route.post('/',passport.authenticate('local', { successRedirect: '/logged',
    failureRedirect: '/login',
    failureFlash: true }));

module.exports=route