import { EVENT_TYPES } from '../constants.js';

const log = ({ ee }) => {
  ee.once(EVENT_TYPES.LOG, ({ data, formatter }) => {
    console.log(formatter.formatMessage(data));
  });
};

export default { log };
