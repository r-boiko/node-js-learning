import { Readable } from 'stream';
import { EVENT_TYPES } from '../constants.js';

const log = ({ ee }) => {
  ee.on(EVENT_TYPES.LOG, ({ data, formatter }) => {
    const readable = new Readable({ read() {} });
    readable.pipe(process.stdout);
    readable.push(formatter.formatMessage(data));

    process.on('beforeExit', () => {
      readable.push(null);
    });
  });
};

export default { log };
