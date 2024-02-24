import fs from 'fs';
import { formatMessage } from '../utils/formatMessage.js';
import { LEVEL } from '../constants.js';

const log = (date, level, category, message) => {
  fs.appendFileSync(
    './logs/app.txt',
    formatMessage(date, level, category, message, '\n'),
    'utf-8',
  );

  if (level === LEVEL.ERROR) {
    fs.appendFileSync(
      './logs/app_error.txt',
      formatMessage(date, level, category, message, '\n'),
      'utf-8',
    );
  }
};

export default { log };
