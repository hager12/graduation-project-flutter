const mongoose = require('mongoose');
var hospitalSchema =  new mongoose.Schema({
    name: {type:String, required:true},
    location: {type:String, require:true},
    description: {type:String, required:true},
    phoneNumber: {type:String, require:true},
    rate: {type:String, required:true},
    picture: {type:String, require:true},
    leet: {type:String, require:true},
    lang: {type:String, required:true},
    webURL: {type:String, require:true}
});
module.exports = mongoose.model('Hospital', hospitalSchema);
