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
      const { name, password } = req.body;

      if (this.userService.checkPassword(name, password)) {
        this.userService.setLoggedUser(name);

        res.redirect(302, '/user/all');
      } else {
        res.render('login', { errorMessage: 'Unauthorized' });
      }
    });
  };
}
