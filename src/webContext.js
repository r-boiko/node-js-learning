import express from 'express';
import path from 'path';
import loggedUserMiddleware from './middlewares/loggedUserMiddleware.js';
import UserController from './controllers/UserController.js';
import UrlController from './controllers/UrlController.js';
import CodeController from './controllers/CodeController.js';
import LoginController from './controllers/LoginController.js';

const initMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(loggedUserMiddleware);
};

const initControllers = (app) => {
  app.get('/', (req, res) => {
    res.redirect(302, '/login');
  });

  app.use('/user', new UserController());
  app.use('/url', new UrlController());
  app.use('/code', new CodeController());
  app.use('/login', new LoginController());
};

const initViews = (app) => {
  app.use(express.static(path.resolve('public')));
  app.set('views', path.resolve('src', 'views'));
  app.set('view engine', 'ejs');
};

const initErrorHandling = (app) => {
  app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).send(err.message);
  });
};

export default (app) => {
  initMiddlewares(app);
  initViews(app);
  initControllers(app);
  initErrorHandling(app);
};
