const express=require('express');
const path=require('path');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));


app.listen(2354,()=>{
console.log('Server on at http://localhost:2354/');
});