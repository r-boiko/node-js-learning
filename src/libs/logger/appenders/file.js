import { appendFile } from 'node:fs/promises';
import { formatMessage } from '../utils/formatMessage.js';
import { LEVEL } from '../constants.js';

const log = async (date, level, category, message) => {
  await appendFile(
    './logs/app.txt',
    formatMessage(date, level, category, message, '\n'),
    'utf-8',
  );

  if (level === LEVEL.ERROR) {
    await appendFile(
      './logs/app_error.txt',
      formatMessage(date, level, category, message, '\n'),
      'utf-8',
    );
  }
};

export default { log };
