//handeling cross origin
const cors = require('cors');
const express  = require('express');
const app = express();
app.use(cors());
app.use(express.json());

//DB
require('./models/db');

//routing modules
const routing = require('./routes/user.route');
const employeeeRouting = require('./routes/employee.route');
const adminRouting = require('./routes/admin.route');
const hospitalRouting = require('./routes/hospital.route');
const mainRouting = require('./routes/main.route');
app.use(routing);
app.use(employeeeRouting);
app.use(adminRouting);
app.use(hospitalRouting);
app.use(mainRouting);

//connecting to server
app.listen(process.env.PORT || 3000 , ()=>{
  console.log('server run...');
})

module.exports = app;
