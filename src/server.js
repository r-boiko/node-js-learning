import express from 'express';
import authMiddleware from './middlewares/authMiddleware.js';
import UserController from './controllers/UserController.js';
import UrlController from './controllers/UrlController.js';
import CodeController from './controllers/CodeController.js';

const app = express();

app.use(authMiddleware);
app.use(express.json());
app.use('/user', new UserController());
app.use('/url', new UrlController());
app.use('/code', new CodeController());

export { app };
