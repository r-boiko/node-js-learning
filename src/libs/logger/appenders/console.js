import { EVENT_TYPES } from '../constants.js';
import { fileName } from '../utils/fileName.js';

const log = ({ ee, streams: { readableStream } }) => {
  ee.on(EVENT_TYPES.LOG, ({ data, formatter }) => {
    readableStream
      .pipe(fileName)
      .pipe(formatter.formatMessage)
      .pipe(process.stdout);
    readableStream.push(data);
  });
};

export default { log };
