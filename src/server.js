import express from 'express';
import authMiddleware from './middlewares/authMiddleware.js';
import { urlRouter } from './routes/urlRouter.js';
import { userRouter } from './routes/userRouter.js';

const app = express();

app.use(authMiddleware);
app.use(express.json());
app.use('/user', userRouter);
app.use('/url', urlRouter);

export { app };
