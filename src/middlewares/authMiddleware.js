import UserService from '../services/UserService.js';

const userService = UserService.getInstance();

export default (req, res, next) => {
  const auth = req.header('Authorization');
  const users = userService.getUsersAuthData();
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

  if (!auth || !auth.startsWith('Basic')) {
    res.status(401).json({ error: 'Auth header not provided' });
    return;
  }

  if (userService.isEmpty()) {
    res.status(401).json({ error: 'Auth failed. Please, add user' });
    return;
  }

  const [key, value] = auth.split(' ')[1].split(':');

  for (const user of users) {
    if (user[key] !== value) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  }

  next();
};
