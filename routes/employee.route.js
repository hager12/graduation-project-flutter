const employeeRouter = require('express').Router();
const employeeController = require('../controllers/empolyee.controller')
const authToken = require('../middleware/empAuth');

employeeRouter.get('/employee', authToken, employeeController.home);
employeeRouter.get('/allHospitals', authToken, employeeController.allHospitals);
employeeRouter.get('/allReviews', authToken, employeeController.allReviews);
employeeRouter.post('/addHospital', authToken, employeeController.addHospital);
employeeRouter.put('/updateHospital', authToken, employeeController.updateHospital)
employeeRouter.delete('/deleteHospital', authToken, employeeController.deleteHospital);
employeeRouter.post('/sendReport', employeeController.sendReport)

module.exports = employeeRouter;
