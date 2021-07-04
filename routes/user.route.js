const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const userAuth = require('../middleware/userAuth');

userRouter.get('/', userController.home);
userRouter.post('/signup', userController.signup);
userRouter.post('/userByID', userController.userByID);
userRouter.post('/getUserData', userController.getUserData);
userRouter.post('/hospitalByName', userAuth, userController.hospitalByName);
userRouter.post('/contact', userAuth, userController.contact);
userRouter.put('/updateUser', userAuth, userController.updateUser);
userRouter.get('/allHospitals', userAuth, userController.allHospitals);
userRouter.get('/allReviews', userAuth, userController.allReviews);
// userRouter.post('/addReview', userController.addReview);
userRouter.put('/updateReview', userAuth, userController.updateReview);
userRouter.delete('/deleteReview', userAuth, userController.deleteReview);
userRouter.post('/booking', userAuth, userController.booking);

module.exports = userRouter;
