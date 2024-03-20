import express from 'express';
import 'dotenv/config';
import webContext from './webContext.js';

const PORT = process.env.PORT || 3000;

const app = express();

webContext(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
