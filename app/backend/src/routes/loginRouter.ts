import * as express from 'express';
import LoginValidation from '../middlewares/loginValidated';

const loginRoute = express.Router({ mergeParams: true });

loginRoute.post('/', LoginValidation, () => {});

export default loginRoute;
