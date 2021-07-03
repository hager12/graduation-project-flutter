const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const authToken = require('../middleware/userAuth');

userRouter.get('/', userController.home);
userRouter.post('/signup', userController.signup);
userRouter.post('/userByID', userController.userByID);
userRouter.post('/hospitalByName', userController.hospitalByName);
userRouter.post('/contact', userController.contact);
userRouter.put('/updateUser', userController.updateUser);
userRouter.get('/allHospitals', userController.allHospitals);
userRouter.get('/allReviews', authToken, userController.allReviews);
// userRouter.post('/addReview', userController.addReview);
userRouter.put('/updateReview', userController.updateReview);
userRouter.delete('/deleteReview', userController.deleteReview);
userRouter.post('/booking',userController.booking);

module.exports = userRouter;