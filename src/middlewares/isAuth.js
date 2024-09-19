// Imports
const User = require('../api/models/user.model');
const { verifySign } = require('../utils/jwt');

// Middleware to authorize actions
const isAuth = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const [, token] = req.headers.authorization.split(' ');

      if (!token) {
        return res
          .status(403)
          .json({ message: 'No está autorizado para ejecutar esta acción' });
      }
      const { id } = verifySign(token);

      const user = await User.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No está autorizado para ejecutar esta acción' });
      }

      if (!allowedRoles.includes(user.rol)) {
        return res
          .status(403)
          .json({ message: 'No está autorizado para ejecutar esta acción' });
      }

      user.password = null;
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid o expired token' });
    }
  };
};

// Exports
module.exports = { isAuth };
