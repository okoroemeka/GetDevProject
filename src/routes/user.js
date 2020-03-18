import express from 'express';
import User from '../controllers/user';
import Validation from '../middlewares/inputValidation';
import Authenticate from '../middlewares/authentication';

const userRouter = express.Router();
userRouter.post('/signup', Validation.ValidateSignUp, User.createUser);
userRouter.post('/login', Validation.validateLogin, User.login);
userRouter.get('/writters', Authenticate.verifyToken, User.getAllWriters);

export default userRouter;
