function requireLogin(req, res, next) {
  if (!req.session.organizationId) {
    return res.redirect('/login');
  }
  return next();
}

function redirectIfLoggedIn(req, res, next) {
  if (req.session.organizationId) {
    return res.redirect('/employees');
  }
  return next();
}

module.exports = { requireLogin, redirectIfLoggedIn };
