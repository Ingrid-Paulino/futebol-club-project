import * as express from 'express';
import loginRoute from './loginRouter';
import clubRoute from './clubsRouter';

const route = express.Router({ mergeParams: true });

route.use('/login', loginRoute);
route.use('/club', clubRoute);

export default route;
