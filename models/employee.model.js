const mongoose = require('mongoose');
var employeeSchema = new mongoose.Schema({
    salary: {type:Number, require:true},
    jobTitle: {type:String, require:true},
    address: {type:String, require:true},
    age: {type:Number, require:true},
    name: {type:String, require:true},
    phoneNumber: {type:Number, require:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    picture: {type:String, require:true},
    role: {type:String, require:true}
});

module.exports = mongoose.model('Employee', employeeSchema);