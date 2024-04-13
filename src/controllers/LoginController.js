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
      const { email, password } = req.body;

      if (await this.userService.checkPassword(email, password)) {
        const user = await this.userService.getUserByEmail(email);
        req.session.login = user.user_id;

        res.redirect(302, '/user/all');
      } else {
        res.render('login', { errorMessage: 'Unauthorized' });
      }
    });
  };
}
