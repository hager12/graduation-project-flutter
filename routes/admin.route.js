const adminRouter = require('express').Router();
const adminController = require('../controllers/admin.controller');
const authToken = require('../middleware/adminAuth');


adminRouter.get('/admin', authToken, adminController.home);
// adminRouter.post('/adminLogin', authToken, adminController.adminLogin);
adminRouter.get('/allEmployee', authToken, adminController.allEmployee);
adminRouter.get('/allHospital', authToken, adminController.allHospital);
adminRouter.post('/addEmployee', authToken, adminController.addEmployee);
adminRouter.put('/updateEmployee', authToken, adminController.updateEmployee);
adminRouter.delete('/deleteEmployee', authToken, adminController.deleteEmployee);

module.exports = adminRouter;
