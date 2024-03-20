import { generateHash } from '../utils.js';

const storage = {};

export default (req, res, next) => {
  let sessionId = req.cookies['sessionId'];
  let session = storage[sessionId];

  if (!session) {
    if (!sessionId) {
      sessionId = generateHash(16);
      res.cookie('sessionId', sessionId, { domain: req.host });
    }

    session = {};
  }

  req.sessionId = sessionId;
  req.session = session;

  next();

  storage[sessionId] = session;
};
