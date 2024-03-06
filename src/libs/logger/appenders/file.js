import { createWriteStream } from 'node:fs';
import { EVENT_TYPES, LEVEL } from '../constants.js';
import { generateFilePath } from '../utils/generateFilePath.js';

const log = ({ ee }) => {
  ee.on(EVENT_TYPES.LOG, ({ data, formatter: { formatMessage } }) => {
    const writeStream = createWriteStream(
      generateFilePath({ fileName: 'app' }),
      {
        flags: 'a',
        encoding: 'utf-8',
      },
    );
    writeStream.write(formatMessage(data));
    writeStream.end();

    if (data.level === LEVEL.ERROR) {
      const writeStreamError = createWriteStream(
        generateFilePath({ fileName: 'app_error' }),
        {
          flags: 'a',
          encoding: 'utf-8',
        },
      );
      writeStreamError.write(formatMessage(data));
      writeStreamError.end();
    }
  });
};

export default { log };
