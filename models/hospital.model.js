const mongoose = require('mongoose');
var hospitalSchema =  new mongoose.Schema({
    name: {type:String, require:true},
    location: {type:String, require:true},
    description: {type:String, require:true},
    phoneNumber: {type:String, require:true},
    rate: {type:String, require:true},
    picture: {type:String, require:true},
    leet: {type:String, require:true},
    lang: {type:String, require:true},
    webURL: {type:String, require:true}
});
module.exports = mongoose.model('Hospital', hospitalSchema);
