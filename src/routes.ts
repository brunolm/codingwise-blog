import * as express from 'express';

export default function routes(app: express.Application) {
  app.use('/', (req, res) => {
    res.render('index.cshtml', { });
  });
}
