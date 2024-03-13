import express from 'express';
import * as urlService from '../services/urlServiceOld.js';

export const codeRouter = new express.Router();

codeRouter.get('/:code', (req, res) => {
  const data = urlService.get(req.params.code);

  if (!data) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  urlService.updateVisits(req.params.code);

  res.redirect(301, data.url);
});
