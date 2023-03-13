// authMiddleware.js


const passport = require('passport');

const authMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authMiddleware;

