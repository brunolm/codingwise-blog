import * as logger from 'log4js';
import config from './config';

export default (namespace, level = logger.levels.INFO) => {
  const log = logger.getLogger(`santander:${namespace}`);
  log.setLevel(config.logLevel || level);
  return log;
};
