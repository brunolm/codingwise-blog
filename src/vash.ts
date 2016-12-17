import * as path from 'path';

const vash = require('vash');

export default function vashApp(app) {
  app.set('view engine', 'vash');
  app.set('views', path.join(__dirname, '../../views'));
  app.engine('cshtml', vash.renderFile);
}
