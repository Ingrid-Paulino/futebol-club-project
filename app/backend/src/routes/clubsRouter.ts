import * as express from 'express';
import ClubsController from '../controllers/clubsController';

const clubRoute = express.Router({ mergeParams: true });

clubRoute.get('/:id', ClubsController.getById);
clubRoute.get('/', ClubsController.getAll);

export default clubRoute;
