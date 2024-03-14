import { Router } from 'express';
import UserService from '../services/UserService.js';

export default class UserController extends Router {
  constructor() {
    super();

    this.userService = UserService.getInstance();
    this.initRoutes();
  }

  initRoutes = () => {
    this.get('/', (req, res) => {
      res.json({ message: 'user service main path' });
    });

    this.get('/all', (req, res) => {
      const users = this.userService.getUsersPublicData();
      const loggedUser = this.userService.getLoggedUser();

      if (this.userService.isEmpty()) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      res.render('users', { users, loggedUser });
    });

    this.get('/create', (req, res) => {
      res.render('create-user');
    });

    this.post('/create', (req, res) => {
      const { name, password } = req.body;

      if (this.userService.isAlreadyExists(name)) {
        res.render('create-user', { errorMessage: 'User name already exist' });
      } else {
        this.userService.create(name, password);

        res.render('login', {
          successMessage: 'Created successfully, please login',
        });
      }
    });
  };
}
