import { generateHash } from '../utils.js';

const initCsrfTokenMiddleware = (req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = generateHash(16);
  }

  next();
};

const checkCsrfTokenMiddleware = (req, res, next) => {
  if (req.session.csrfToken !== req.body.csrfToken) {
    return res.status(403);
  }

  next();
};

export { initCsrfTokenMiddleware, checkCsrfTokenMiddleware };
