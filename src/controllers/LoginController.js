import { Router } from 'express';
import UserService from '../services/UserService.js';

export default class LoginController extends Router {
  constructor() {
    super();

    this.userService = UserService.getInstance();
    this.initRoutes();
  }

  initRoutes = () => {
    this.get('/', (req, res) => {
      res.render('login');
    });

    this.post('/', (req, res) => {
      const { login, password } = req.body;

      if (this.userService.checkPassword(login, password)) {
        res.redirect(302, '/user');
      } else {
        res.render('login', { errorMessage: 'Unauthorized' });
      }
    });
  };
}
