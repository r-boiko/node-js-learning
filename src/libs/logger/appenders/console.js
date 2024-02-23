import { formatMessage } from '../utils/formatMessage.js';

const log = (date, level, category, message) => {
  console.log(formatMessage(date, level, category, message));
};

export default { log };
