import * as glob from 'glob';
import * as fs from 'fs';

export function getFiles(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob('**/assets/posts/**/*.md', (err, matches) => {
      if (err) {
        return reject(err);
      }

      return resolve(matches);
    });
  });
}

export function readFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        return reject(err);
      }

      return resolve(data.toString());
    });
  });
}
