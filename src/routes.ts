import * as express from 'express';
import * as path from 'path';

const app = express.Router();

app.use('/static', express.static(path.join(__dirname, '../../node_modules/jquery/dist/')));
app.use('/static', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/')));
app.use('/static', express.static(path.join(__dirname, '../../node_modules/font-awesome/')));
app.use('/static', express.static(path.join(__dirname, '../../assets')));

app.use('/post', require('./post'));

export = app;
