const employeeRouter = require('express').Router();
const employeeController = require('../controllers/empolyee.controller')
const empAuth = require('../middleware/empAuth');

employeeRouter.get('/employee', empAuth, employeeController.home);
employeeRouter.get('/allHospitalEmp', empAuth, employeeController.allHospitals);
employeeRouter.post('/getHosByID', empAuth, employeeController.getHosByID);
employeeRouter.get('/allReviews', empAuth, employeeController.allReviews);
employeeRouter.post('/addHospital', empAuth, employeeController.addHospital);
employeeRouter.put('/updateHospital', empAuth, employeeController.updateHospital)
employeeRouter.delete('/deleteHospital', empAuth, employeeController.deleteHospital);
employeeRouter.post('/sendReport', employeeController.sendReport)

module.exports = employeeRouter;
