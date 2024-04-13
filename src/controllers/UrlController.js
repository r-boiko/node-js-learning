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
    this.get('/info/:code', sessionAuthMiddleware, async (req, res) => {
      const selectedUrl = await this.urlService.getUrlByCode(req.params.code);

      if (!selectedUrl) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      res.status(200).json(selectedUrl);
    });

    this.get('/all', sessionAuthMiddleware, async (req, res) => {
      const loggedUser = req.session.login;
      const urls = await this.urlService.getUrlsByUser(loggedUser);

      res.render('url/all', { urls });
    });

    this.post('/add', sessionAuthMiddleware, async (req, res) => {
      const loggedUser = req.session.login;

      const createdUrl = await this.urlService.create({
        loggedUser,
        ...req.body,
      });

      res.status(200).json(createdUrl);
    });
  };
}
