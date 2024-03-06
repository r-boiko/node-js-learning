import { createWriteStream } from 'node:fs';
import { EVENT_TYPES, LEVEL } from '../constants.js';
import { generateFilePath } from '../utils/generateFilePath.js';
import { Readable } from 'stream';
import { fileName } from '../utils/fileName.js';
import { clearStreams } from '../utils/clearStreams.js';

const log = ({ ee }) => {
  ee.on(EVENT_TYPES.LOG, ({ data, formatter: { formatMessage } }) => {
    const readable = new Readable({ read() {}, objectMode: true });
    const transform = readable.pipe(fileName).pipe(formatMessage);

    const writeStream = createWriteStream(
      generateFilePath({ fileName: 'app' }),
      {
        flags: 'a',
        encoding: 'utf-8',
      },
    );

    transform.pipe(writeStream);
    readable.push(data);

    if (data.level === LEVEL.ERROR) {
      const writeStreamError = createWriteStream(
        generateFilePath({ fileName: 'app_error' }),
        {
          flags: 'a',
          encoding: 'utf-8',
        },
      );

      transform.pipe(writeStreamError);
      readable.push(data);
    }

    clearStreams(readable);
  });
};

export default { log };
