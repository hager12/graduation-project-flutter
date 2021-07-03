const mongoose = require('mongoose');
var bookingSchema =  new mongoose.Schema({
    depID: {type:mongoose.Schema.Types.ObjectId, ref:"Department"},
    depName: {type: String},
    hosID: {type: String},
    hosName: {type: String},
    leastPrice : {type: Number},
    mostPrice : {type: Number}
});
module.exports = mongoose.model('Booking', bookingSchema);