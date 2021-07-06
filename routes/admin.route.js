const adminRouter = require('express').Router();
const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middleware/adminAuth');


adminRouter.get('/admin', adminController.home);
// adminRouter.post('/adminLogin', adminAuth, adminController.adminLogin);
adminRouter.get('/allEmployee', adminAuth, adminController.allEmployee);
adminRouter.get('/allHospital', adminAuth, adminController.allHospital);
adminRouter.post('/getEmpByID', adminAuth, adminController.getEmpByID);
adminRouter.post('/addEmployee', adminAuth, adminController.addEmployee);
adminRouter.put('/updateEmployee', adminAuth, adminController.updateEmployee);
adminRouter.delete('/deleteEmployee', adminAuth, adminController.deleteEmployee);

module.exports = adminRouter;
