const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:12345@gp.hhrep.mongodb.net/Revive?retryWrites=true&w=majority',
  {useNewUrlParser : true},
  (err)=>{
    if (!err){ console.log('MongoDB Connection Succeeded')}
    else { console.log('Error in DB Connection : ' + err)}
});