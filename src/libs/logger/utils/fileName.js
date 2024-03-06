import { Transform } from 'stream';
import path from 'path';

export const fileName = new Transform({
  transform(chunk, encoding, callback) {
    // eslint-disable-next-line no-unused-vars
    const [_, filePath] = process.argv;

    this.push({ ...chunk, fileName: path.basename(filePath) });

    callback();
  },
  objectMode: true,
});
