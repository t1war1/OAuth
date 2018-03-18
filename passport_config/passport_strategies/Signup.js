const LocalStrategy=require('passport-local').Strategy;
const Users=require('../../models/db');

module.exports=new LocalStrategy((username,password,done)=>{
    Users.findOne({username:username},(err,user)=>{
        if(err)
        {
            console.log('Error')
            return done(err);
        }

        if(user)
        {
            console.log('username not available')
            return done(null,false,{message: 'Username already taken'});
        }

        var user=new Users({username:username,password:password});
        user.save((err)=>{
            if (err)
                throw err;
            console.log('username saved');
            return done(null,user);
        })


    })
})