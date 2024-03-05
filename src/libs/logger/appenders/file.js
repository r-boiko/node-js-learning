import { appendFile } from 'node:fs/promises';
import { EVENT_TYPES, LEVEL } from '../constants.js';
import { generateFilePath } from '../utils/generateFilePath.js';

const log = async ({ ee }) => {
  ee.once(EVENT_TYPES.LOG, async ({ data, formatter: { formatMessage } }) => {
    await appendFile(
      generateFilePath({ fileName: 'app' }),
      formatMessage(data),
      'utf-8',
    );

    if (data.level === LEVEL.ERROR) {
      await appendFile(
        generateFilePath({ fileName: 'app_error' }),
        formatMessage(data),
        'utf-8',
      );
    }
  });
};

export default { log };
