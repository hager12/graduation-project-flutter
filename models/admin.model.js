const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var adminSchema = new mongoose.Schema({
    address: {type:String, require:true},
    age: {type:Number, require:true},
    name: {type:String, require:true},
    phoneNumber: {type:Number, require:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    picture: {type:String, require:true},
    role: {type:String, require:true}
});
adminSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password , bcrypt.genSaltSync(5) ,null)
}

module.exports = mongoose.model('Admin', adminSchema);