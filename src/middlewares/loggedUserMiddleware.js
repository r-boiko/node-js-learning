export default (req, res, next) => {
  const loggedUser = req.session.login;

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
