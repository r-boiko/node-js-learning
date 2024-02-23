import logger from './logger.js';

const log = logger.getLogger('testLogger.js');

log.info(1);
log.error(2);
log.error(3);
log.info(4);
log.info(5);
log.warn(6);
log.info(7);
