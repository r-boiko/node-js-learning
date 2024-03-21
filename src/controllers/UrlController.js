import { Router } from 'express';
import UserService from '../services/UserService.js';
import UrlService from '../services/UrlService.js';
import sessionAuthMiddleware from '../middlewares/sessionAuthMiddleware.js';

export default class UrlController extends Router {
  constructor() {
    super();

    this.urlService = UrlService.getInstance();
    this.userService = UserService.getInstance();
    this.initRoutes();
  }

  initRoutes = () => {
    this.get('/info/:code', sessionAuthMiddleware, (req, res) => {
      const selectedUrl = this.urlService.getUrlByCode(req.params.code);

      if (!selectedUrl) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      res.status(200).json(selectedUrl);
    });

    this.get('/all', sessionAuthMiddleware, (req, res) => {
      const loggedUser = this.userService.getLoggedUser();
      const urls = this.urlService.getUrlsByUser(loggedUser);

      res.render('url/all', { urls });
    });

    this.post('/add', sessionAuthMiddleware, (req, res) => {
      const { name, url } = req.body;
      const loggedUser = this.userService.getLoggedUser();

      const createdUrl = this.urlService.create(name, url, loggedUser);

      res.status(200).json(createdUrl);
    });
  };
}
