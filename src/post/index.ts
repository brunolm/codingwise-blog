import * as express from 'express';

const app = express.Router();

app.use(require('./post'));

export = app;
