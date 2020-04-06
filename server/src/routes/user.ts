import { Router } from 'express';
import UserController from '../controller/UserController';

const userController = new UserController()
const userRouter = Router();

// Authentication routes
userRouter.delete('/signout', userController.logout);
userRouter.post('/signup', userController.create);
userRouter.post('/signin', userController.login);
userRouter.post('/confirm', userController.confirm);
userRouter.post('/resend-code', userController.resendCode);
userRouter.get('/recover-password', userController.recoverPasswordPage);
userRouter.post('/recover-password', userController.recoverPassword);
userRouter.put('/update-password', userController.updatePassword);

userRouter.get('/:userId', userController.get);
userRouter.get('/', userController.get);
userRouter.put('/:userId', userController.update);
userRouter.delete('/:userId', userController.destroy);

export default userRouter;