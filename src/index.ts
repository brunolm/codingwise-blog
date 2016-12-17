import app from './app';
import logger from './lib/logger';
import config from './config';

const log = logger('index', 'INFO');
const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', err => {
  if (err) {
    return log.error(err);
  }

  log.info(`App started on port ${port}! Env: ${config.env}`);
});

