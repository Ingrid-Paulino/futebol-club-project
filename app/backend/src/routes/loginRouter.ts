import * as express from 'express';
import LoginValidation from '../middlewares/loginValidated';
import LoginController from '../controllers/loginController';

const loginRoute = express.Router({ mergeParams: true });

loginRoute.post('/', LoginValidation.validateParams, LoginController.createLogin);

export default loginRoute;
