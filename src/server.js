import express from 'express';
import { getUsers, saveUsers } from './handlers.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.send('Hello world!');
});

app.post('/users', saveUsers);

app.get('/api/v1/users', getUsers);

export { app };
