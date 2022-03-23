import * as express from 'express';
import MatchsController from '../controllers/matchsController';

const matchsRoute = express.Router({ mergeParams: true });

// matchsRoute.get('/:id', MatchsController.getById);
matchsRoute.get('/', MatchsController.getAll);

export default matchsRoute;
