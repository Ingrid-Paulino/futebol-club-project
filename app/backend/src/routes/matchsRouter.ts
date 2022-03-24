import * as express from 'express';
import MatchsController from '../controllers/matchsController';

import ValidateJWT from '../middlewares/auth/validateJWT';

const matchsRoute = express.Router({ mergeParams: true });

matchsRoute.get('/', MatchsController.getAllEndSearch);
matchsRoute.post('/', ValidateJWT.verifyToken, MatchsController.createMatch);

export default matchsRoute;
