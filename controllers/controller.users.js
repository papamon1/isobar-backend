const User = require("../models/model.users");
const passport = require("passport");

exports.login = function (req, res, next) {
  const { email, password, deviceId } = req.body;

  if (!email) {
    return res.status(422).json({
      errors: {
        email: "is required",
        message: "Email is required",
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: "is required",
        message: "Password is required",
      },
    });
  }

  return passport.authenticate("user-local", (err, passportUser) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      return res.json(passportUser.toAuthJSON());
    } else {
      return res.status(422).send({
        errors: {
          message: "Invalid password or email",
        },
      });
    }
  })(req, res, next);
};

exports.listUsers = function (req, res) {
  User.find({})
    .populate("Role")
    .exec((errors, users) => {
      if (errors) return res.status(422).send({ errors });
      return res.status(200).json({ users });
    });
};
