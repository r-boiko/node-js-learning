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

      if (this.userService.isEmpty()) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      res.json(users);
    });

    this.post('/create', (req, res) => {
      const { name, password } = req.body;

      const createdUser = this.userService.create(name, password);

      res.status(200).json(createdUser);
    });
  };
}
