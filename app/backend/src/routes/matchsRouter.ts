import * as express from 'express';
import MatchsController from '../controllers/matchsController';
import ValidateJWT from '../middlewares/auth/validateJWT';

const matchsRoute = express.Router({ mergeParams: true });
const leaderboard = express.Router({ mergeParams: true });

// leaderboard.get('/', MatchsController.leaderboardleaderboard);
matchsRoute.get('/', MatchsController.getAllEndSearch);
matchsRoute.post('/', ValidateJWT.verifyToken, MatchsController.createMatch);
matchsRoute.patch('/:id/finish', MatchsController.updatePatch);
matchsRoute.patch('/:id', MatchsController.getById);

export { matchsRoute, leaderboard };
