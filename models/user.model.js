const mongoose = require('mongoose');
const bcrypt = require('bcrypt') ;
var userSchema = new mongoose.Schema({
    address: {type:String, require:true},
    age: {type:Number, require:true},
    name: {type:String, require:true},
    phoneNumber: {type:String, require:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    picture: {type:String, require:true},
    role: {type:String, require:true}
});
userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password , bcrypt.genSaltSync(5) ,null)
}
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password , this.password) ;
}
module.exports = mongoose.model('User', userSchema);