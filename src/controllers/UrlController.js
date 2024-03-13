import { Router } from 'express';
import UserService from '../services/UserService.js';
import UrlService from '../services/UrlService.js';

export default class UrlController extends Router {
  constructor() {
    super();
    this.urlService = UrlService.getInstance();
    this.userService = UserService.getInstance();

    this.init();
  }

  init = () => {
    this.get('/info/:code', (req, res) => {
      const url = this.urlService.getUrlByCode(req.params.code);

      if (!url) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      res.status(200).json(url);
    });

    this.post('/add', (req, res) => {
      const { name, url } = req.body;
      const loggedUser = this.userService.getLoggedUser();
      console.log('loggedUser', loggedUser);

      const createdUrl = this.urlService.create(name, url, loggedUser);

      res.status(200).json(createdUrl);
    });
  };
}