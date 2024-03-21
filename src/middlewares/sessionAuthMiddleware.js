export default (req, res, next) => {
  if (req.session.login) {
    next();
    return;
  }

  res.redirect(302, '/login');
};
