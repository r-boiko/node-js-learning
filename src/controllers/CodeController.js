import { Router } from 'express';
import UrlService from '../services/UrlService.js';
import sessionAuthMiddleware from '../middlewares/sessionAuthMiddleware.js';
import validateUrlMiddleware from '../middlewares/validateUrlMiddleware.js';
import {
  rateLimitByUserIdMiddleware,
  rateLimitByCodeMiddleware,
  rateLimitByIpMiddleware,
} from '../middlewares/rateLimitMiddleware.js';

export default class CodeController extends Router {
  constructor() {
    super();

    this.urlService = UrlService.getInstance();
    this.initRoutes();
  }

  initRoutes = () => {
    this.get(
      '/:code',
      sessionAuthMiddleware,
      validateUrlMiddleware,
      rateLimitByIpMiddleware(),
      rateLimitByUserIdMiddleware(),
      rateLimitByCodeMiddleware(),
      async (req, res) => {
        const selectedUrl = await this.urlService.getUrlByCode(req.params.code);

        if (!selectedUrl) {
          res.status(404).json({ error: 'Not found' });
          return;
        }

        await this.urlService.updateVisitsByCode(req.params.code);

        res.redirect(302, selectedUrl.url);
      },
    );
  };
}
