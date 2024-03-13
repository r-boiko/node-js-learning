import config from '../config/config.js';
import { EVENT_TYPES } from '../constants.js';
import { fileName } from '../utils/fileName.js';
import net from 'node:net';

const log = ({ ee, streams: { readableStream } }) => {
  const netClient = net.connect({ host: config.hostname, port: config.port });

  ee.on(EVENT_TYPES.LOG, ({ data, formatter }) => {
    readableStream.pipe(fileName).pipe(formatter.formatMessage);
    readableStream.push(data);

    readableStream.on('data', (data) => {
      netClient.write(JSON.stringify(data));
    });
  });
};

export default { log };
