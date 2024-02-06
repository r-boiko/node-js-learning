import express from 'express';

const app = express();

app.get('/test', (req, res) => {
  res.send('Hello world!');
});

export { app };
