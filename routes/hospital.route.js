const hospitalRouter = require('express').Router();
const hospitalController = require('../controllers/hospital.controller');

hospitalRouter.get('/allDepartments', hospitalController.allDepartments);
hospitalRouter.post('/depByID', hospitalController.depByID);
hospitalRouter.post('/addDep', hospitalController.addDep);
hospitalRouter.put('/updateDep', hospitalController.updateDep);
hospitalRouter.delete('/deleteDep', hospitalController.deleteDep);

module.exports = hospitalRouter;