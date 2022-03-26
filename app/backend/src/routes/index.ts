import * as express from 'express';
import loginRoute from './loginRouter';
import clubRoute from './clubsRouter';
import { matchsRoute, leaderboard } from './matchsRouter';

const route = express.Router({ mergeParams: true });

route.use('/login', loginRoute);
route.use('/clubs', clubRoute);
route.use('/matchs', matchsRoute);
route.use('/leaderboard/home', leaderboard);

export default route;
