import * as express from 'express';
import LoginValidation from '../middlewares/loginValidated';
import LoginController from '../controllers/loginController';
import ValidateJWT from '../middlewares/auth/validateJWT';

const loginRoute = express.Router({ mergeParams: true });

loginRoute.post('/', LoginValidation.validateParams, LoginController.createLogin);
loginRoute.get('/validate', ValidateJWT.verifyToken, LoginController.getLoginRole);

loginRoute.get('/', LoginController.getAll);

export default loginRoute;
