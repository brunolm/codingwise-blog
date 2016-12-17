import * as express from 'express';
import * as marked from 'marked';
import * as path from 'path';
import * as yaml from 'js-yaml';

import logger from '../lib/logger';
import wrap from '../lib/route-wrap';
import { getFiles, readFile } from '../lib/file';

const app = express.Router();
const log = logger('api/post');

app.use('/:slug', wrap(async (req, res) => {
  const files = await getFiles();

  const postPath = files
    .find(file => new RegExp(`^${req.params.slug}$`, 'i')
    .test(path.basename(file).replace(/^\d+-|[.]md/ig, '')));

  log.debug(postPath);

  const fileContent = await readFile(postPath);
  const contentParts = fileContent.split(/---/g);
  const headerContent = contentParts[1];
  const content = marked.parse(contentParts.slice(2).join('---'));

  const header = yaml.load(headerContent);

  res.render('post', { header, content });
}));

export = app;
