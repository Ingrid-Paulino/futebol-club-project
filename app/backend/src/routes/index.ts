import * as express from 'express';
import loginRoute from './loginRouter';
import clubRoute from './clubsRouter';
import { matchsRoute, leaderboard, leaderboardHomeTeam, leaderboardAwayTeam } from './matchsRouter';

const route = express.Router({ mergeParams: true });

route.use('/login', loginRoute);
route.use('/clubs', clubRoute);
route.use('/matchs', matchsRoute);
route.use('/leaderboard/home', leaderboardHomeTeam);
route.use('/leaderboard/away', leaderboardAwayTeam);
route.use('/leaderboard', leaderboard);

export default route;
