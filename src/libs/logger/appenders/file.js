import { appendFile } from 'node:fs/promises';
import { LEVEL } from '../constants.js';
import { generateFilePath } from '../utils/generateFilePath.js';

const log = async ({ data, formatter: { formatMessage } }) => {
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
};

export default { log };
