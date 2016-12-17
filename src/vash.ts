import * as moment from 'moment';
import * as path from 'path';

const vash = require('vash');

vash.helpers.json = function (content) {
  this.buffer.push(`<pre>${JSON.stringify(content, null, 2)}</pre>`);
};

vash.helpers.isoDate = date => new Date(date).toISOString();
vash.helpers.relativeDate = date => moment(new Date(date)).fromNow();

export default function vashApp(app) {
  app.set('view engine', 'cshtml');
  app.set('views', path.join(__dirname, '../../views'));
  app.engine('cshtml', vash.renderFile);
}
