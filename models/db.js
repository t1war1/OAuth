const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');

const schema=mongoose.Schema({
    username:String,
    password:String,
})

const Users=mongoose.model('Users',schema);

exports=module.exports=Users;