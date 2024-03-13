import express from 'express';
import { generateHash } from '../utils.js';
import * as urlService from '../services/urlService.js';
import { loggedUser } from '../services/userServiceOld.js';

export const urlRouter = new express.Router();

urlRouter.post('/add', (req, res) => {
  const data = {
    code: generateHash(),
    name: req.body.name,
    url: req.body.url,
    visits: 0,
    created_time: Date.now(),
    user: loggedUser,
  };

  urlService.add(data.code, data);

  res.status(200).json(data);
});

urlRouter.get('/info/:code', (req, res) => {
  const data = urlService.get(req.params.code);

  if (!data) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  res.status(200).json(data);
});
