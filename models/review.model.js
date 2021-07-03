const mongoose = require('mongoose');
var reviewSchema =  new mongoose.Schema({
    comment: {type:String, required:true},
    keywords: {type:String, require:true},
    userID: {type:mongoose.Schema.Types.ObjectId, ref:"User"}
});
module.exports = mongoose.model('Review', reviewSchema);