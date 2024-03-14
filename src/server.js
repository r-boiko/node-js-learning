import express from 'express';
import path from 'path';
import authMiddleware from './middlewares/authMiddleware.js';
import UserController from './controllers/UserController.js';
import UrlController from './controllers/UrlController.js';
import CodeController from './controllers/CodeController.js';
import LoginController from './controllers/LoginController.js';

const app = express();

app.get('/', (req, res) => {
  res.redirect(302, '/login');
});

app.use(authMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', new UserController());
app.use('/url', new UrlController());
app.use('/code', new CodeController());
app.use('/login', new LoginController());

app.use(express.static(path.resolve('public')));
app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'ejs');

export { app };
