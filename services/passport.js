const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/model.users");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Local strategy
passport.use(
  "user-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }

        if (user.newComparePassword(password) === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

passport.use(
  new JwtStrategy(jwtOptions, function (payload, done) {
    console.log(payload);
    if (payload.type && payload.type === "bouser") {
      BackOfficeUser.findById(payload.id, function (err, user) {
        if (err) {
          return done(err, false);
        }

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } else {
      User.findById(payload.id, function (err, user) {
        if (err) {
          return done(err, false);
        }

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }
  })
);
