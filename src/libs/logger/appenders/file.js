import { EVENT_TYPES, LEVEL } from '../constants.js';
import { fileName } from '../utils/fileName.js';

const log = ({
  ee,
  streams: { readableStream, writeStream, writeStreamError },
}) => {
  ee.on(EVENT_TYPES.LOG, ({ data, formatter: { formatMessage } }) => {
    const transform = readableStream.pipe(fileName).pipe(formatMessage);
    transform.pipe(writeStream);
    readableStream.push(data);

    if (data.level === LEVEL.ERROR) {
      transform.pipe(writeStreamError);
      readableStream.push(data);
    }
  });
};

export default { log };
