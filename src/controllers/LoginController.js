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

    this.post('/', async (req, res) => {
      const { name, password } = req.body;

      if (await this.userService.checkPassword(name, password)) {
        const user = await this.userService.getUserByName(name);
        req.session.login = user.user_id;

        res.redirect(302, '/user/all');
      } else {
        res.render('login', { errorMessage: 'Unauthorized' });
      }
    });
  };
}
