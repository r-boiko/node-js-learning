import UserService from '../services/UserService.js';

const userService = UserService.getInstance();

export default (req, res, next) => {
  const loggedUser = userService.getLoggedUser();

  if (
    loggedUser ||
    req.url.includes('user/create') ||
    req.url.includes('login') ||
    req.url.includes('css')
  ) {
    next();
    return;
  }

  res.redirect(302, '/login');
};
