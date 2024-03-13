import express from 'express';
import authMiddleware from './middlewares/authMiddleware.js';
import UserController from './controllers/UserController.js';

const app = express();

app.use(authMiddleware);
app.use(express.json());
app.use('/user', new UserController());
// app.use('/url', urlRouter);
// app.use('/code', codeRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Main route' });
});

export { app };
