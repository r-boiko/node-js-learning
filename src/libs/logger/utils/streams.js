import { Readable } from 'stream';
import { createWriteStream } from 'node:fs';
import { generateFilePath } from './generateFilePath.js';

export const readableStream = new Readable({ read() {}, objectMode: true });

export const writeStream = createWriteStream(
  generateFilePath({ fileName: 'app' }),
  {
    flags: 'a',
    encoding: 'utf-8',
  },
);

export const writeStreamError = createWriteStream(
  generateFilePath({ fileName: 'app_error' }),
  {
    flags: 'a',
    encoding: 'utf-8',
  },
);

process.on('beforeExit', () => {
  readableStream.push(null);
  writeStream.end();
  writeStreamError.end();
});

process.on('SIGINT', () => {
  readableStream.push(null);
  writeStream.end();
  writeStreamError.end();
});
