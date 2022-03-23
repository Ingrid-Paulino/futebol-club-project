import * as express from 'express';
import loginRoute from './loginRouter';
import clubRoute from './clubsRouter';
import matchsRoute from './matchsRouter';

const route = express.Router({ mergeParams: true });

route.use('/login', loginRoute);
route.use('/club', clubRoute);
route.use('/matchs', matchsRoute);

export default route;
