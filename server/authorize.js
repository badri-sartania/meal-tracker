const expressJwt = require("express-jwt");
const { jwtSecret } = require("./config");

const User = require("./user.model");

const authorize = (roles = []) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    expressJwt({ secret: jwtSecret }),

    // authorize based on user role
    async (req, res, next) => {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).json({
          message: "You are automatically logged out by server.",
          code: "INVALID_TOKEN"
        });
      }

      // attach role to req.user
      req.user.role = user.role;
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({
          message: "You are not authorized to perform this action."
        });
      }

      // authentication and authorization successful
      next();
    }
  ];
};

module.exports = authorize;
