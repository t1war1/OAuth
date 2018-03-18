const LocalStrategy=require('passport-local').Strategy;
const Users=require('../../models/db');

module.exports=new LocalStrategy((username,password,done)=>{
    Users.findOne({username:username},function (err,user) {
        if(err)
            return done(err);

        if(!user)
        {
            return done(null,false,{message:'incorrect username'});
        }

        if(user.password!=password)
        {
            return done(null,false,{message:'username or password is incorrect'});
        }

        return done(null,true);
    })
})