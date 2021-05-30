const passport = require("passport");
const users = require("../models/model.users");

exports.onlyAuthUser = passport.authenticate("jwt", { session: false });

exports.authenticateAndPermissions = (req, res, permission, next) => {
  if (!req.user._doc.role._doc.permissions.includes(permission)) {
    return res.status(401).json({
      errors: {
        message: "User does not have required role to perform requested action",
      },
    });
  }
  return next();
};
