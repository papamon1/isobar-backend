const express = require("express");
const router = express.Router();
const UsersCtrl = require("../controllers/controller.users");
const AuthCtrl = require("../controllers/controller.auth");

router.post("/login", UsersCtrl.login);

router.get(
  "/",
  AuthCtrl.onlyAuthUser,
  (req, res, next) =>
    AuthCtrl.authenticateAndPermissions(req, res, "READ_USERS", next),
  UsersCtrl.listUsers
);
router.get("/me", AuthCtrl.onlyAuthUser, UsersCtrl.getMe);

module.exports = router;
