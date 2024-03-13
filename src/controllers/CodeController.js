import { Router } from 'express';
import UrlService from '../services/UrlService.js';

export default class CodeController extends Router {
  constructor() {
    super();
    this.urlService = UrlService.getInstance();

    this.init();
  }

  init = () => {
    this.get('/:code', (req, res) => {
      const selectedUrl = this.urlService.getUrlByCode(req.params.code);

      if (!selectedUrl) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      this.urlService.updateVisitsByCode(req.params.code);

      res.redirect(302, selectedUrl.url);
    });
  };
}
