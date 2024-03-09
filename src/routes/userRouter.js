import express from 'express';
import { generateHash } from '../utils.js';
import * as userService from '../services/userService.js';

export const userRouter = new express.Router();

userRouter.post('/create', (req, res) => {
  const data = {
    id: generateHash(),
    name: req.body.name,
    password: req.body.password,
    created_time: Date.now(),
  };

  userService.create(data.id, data);

  res.status(200).json(data);
});

userRouter.get('/all', (req, res) => {
  const data = userService.getAll();

  if (userService.isEmpty()) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  res.status(200).json(data);
});
