import * as express from 'express';
import loginRoute from './loginRouter';

const route = express.Router({ mergeParams: true });

route.use('/login', loginRoute);

export default route;
