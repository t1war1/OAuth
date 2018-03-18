const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');

const schema=mongoose.Schema({
    name:String,
    password:String,
    token:String
})

const Users=mongoose.model('Users',schema);

exports=module.exports=Users;