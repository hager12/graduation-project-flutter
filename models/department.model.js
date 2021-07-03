const mongoose = require('mongoose');
var departmentSchema =  new mongoose.Schema({
    name: {type:String, required:true},
    availableRoom: {type:Number, required:true},
    leastPrice : {type: Number, required:true},
    mostPrice : {type: Number, required:true},
    hospitalID: {type:mongoose.Schema.Types.ObjectId, ref:"Hospital"}
});
module.exports = mongoose.model('Department', departmentSchema);