const mainRouter = require('express').Router();
const mainController = require('../controllers/main.controller');

mainRouter.post('/login', mainController.login);

module.exports = mainRouter;