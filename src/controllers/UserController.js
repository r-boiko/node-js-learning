import { Router } from 'express';
import UserService from '../services/UserService.js';
import sessionAuthMiddleware from '../middlewares/sessionAuthMiddleware.js';
import { checkCsrfTokenMiddleware } from '../middlewares/csrfMiddleware.js';

export default class UserController extends Router {
  constructor() {
    super();

    this.userService = UserService.getInstance();
    this.initRoutes();
  }

  initRoutes = () => {
    this.get('/', sessionAuthMiddleware, (req, res) => {
      res.json({ message: 'user service main path' });
    });

    this.get('/all', sessionAuthMiddleware, async (req, res) => {
      const users = await this.userService.getUsersPublicData();
      const loggedUser = req.session.login;

      res.render('user/all', { users, loggedUser });
    });

    this.get('/create', (req, res) => {
      res.render('user/create', { csrfToken: req.session.csrfToken });
    });

    this.post('/create', checkCsrfTokenMiddleware, async (req, res) => {
      const { name, password, email } = req.body;

      if (await this.userService.isAlreadyExists(email)) {
        res.render('user/create', {
          errorMessage: 'User already exist',
          csrfToken: req.session.csrfToken,
        });
      } else {
        await this.userService.create(name, password, email);

        res.render('login', {
          successMessage: 'Created successfully, please login',
        });
      }
    });
  };
}
