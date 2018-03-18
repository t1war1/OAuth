const express=require('express');
const path=require('path');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const flash=require('flash');
const session=require('express-session');
const passport=require('./passport_config/passporthandler')
const routes={
    locallogin:require('./routes/login'),
    signup:require('./routes/signup'),
    logged:require('./routes/logged')
}

const PORT=process.env.PORT || 2354;


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

app.use(session({secret:'nosecrets',
    resave: false,
    saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/signup',routes.signup);
app.use('/login',routes.locallogin);
app.use('/logged',routes.logged)



app.listen(PORT,()=>{
console.log('Server on at http://localhost:2354/');
});