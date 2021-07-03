const mongoose = require('mongoose');
var hospitalSchema =  new mongoose.Schema({
    location: {type:String, required:true},
    picture: {type:String, require:true},
    name: {type:String, required:true},
    rate: {type:Number, require:true}
});
module.exports = mongoose.model('Hospital', hospitalSchema);