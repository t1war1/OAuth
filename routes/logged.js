const route=require('express').Router();

route.get('/',isLoggedIn,(req,res)=>{
    res.render('userDetails',{
        username:req.user
    })
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/signup');
}

module.exports=route