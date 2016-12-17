import * as express from 'express';

export default function wrap(fn: (req: express.Request, res: express.Response, ...args) => any, ...args) {
  return (req, res, ...args) => fn(req, res, ...args).catch(args[2]);
}
