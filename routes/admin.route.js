const adminRouter = require('express').Router();
const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middleware/adminAuth');


adminRouter.get('/admin', adminController.home);
adminRouter.get('/allEmployee', adminAuth, adminController.allEmployee);
adminRouter.get('/hospitalDashboard', adminAuth, adminController.hospitalDashboard);
adminRouter.post('/getEmpByID', adminAuth, adminController.getEmpByID);
adminRouter.post('/addEmployee', adminAuth, adminController.addEmployee);
adminRouter.put('/updateEmployee', adminAuth, adminController.updateEmployee);
adminRouter.delete('/deleteEmployee', adminAuth, adminController.deleteEmployee);

module.exports = adminRouter;
