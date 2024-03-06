import { Readable } from 'stream';
import { EVENT_TYPES } from '../constants.js';
import { fileName } from '../utils/fileName.js';
import { clearStreams } from '../utils/clearStreams.js';

const log = ({ ee }) => {
  ee.on(EVENT_TYPES.LOG, ({ data, formatter }) => {
    const readable = new Readable({ read() {}, objectMode: true });
    readable.pipe(fileName).pipe(formatter.formatMessage).pipe(process.stdout);
    readable.push(data);

    clearStreams(readable);
  });
};

export default { log };
