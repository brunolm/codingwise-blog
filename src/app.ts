import * as express from 'express';
import vashApp from './vash';
import routes from './routes';

const app = express();

vashApp(app);
routes(app);

export default app;
