import * as express from 'express';
import * as log4js from 'log4js';
import * as marked from 'marked';
import * as path from 'path';
import * as yaml from 'js-yaml';

import wrap from './lib/route-wrap';
import { getFiles, readFile } from './lib/file';

import vashApp from './vash';
import * as routes from './routes';
import config from './config';
import logger from './lib/logger';

const app = express();
const log = logger('app');

vashApp(app);

if (/^(DEBUG|ALL)$/.test(config.logLevel)) {
  app.use((req, res, next) => {
    log.debug(req.url);
    next();
  });
}

app.use('/', routes);

app.use('/_ping', (req, res) => res.send(200));

app.all('/', wrap(async (req, res) => {
  const files = (await getFiles()).reverse();

  const posts = [];
  for (let file of files) {
    const fileContent = await readFile(file);
    const contentParts = fileContent.split(/---/g);
    const headerContent = contentParts[1];
    const content = marked.parse(contentParts.slice(2).join('---').split(/<!--\s*more\s*-->/i)[0]);

    const header = yaml.load(headerContent);

    const link = path.basename(file).replace(/^\d+-|[.]md/ig, '');

    posts.push({
      header,
      link: `/post/${link}`,
      content,
    });
  }

  res.render('posts', { posts });
}));

export default app;
