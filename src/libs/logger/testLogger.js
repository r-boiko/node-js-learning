import logger from './logger.js';

const log = logger.getLogger('testLogger.js');

log.error(1);
log.warn(2);
log.info(3);
log.debug(4);
log.trace(5);
