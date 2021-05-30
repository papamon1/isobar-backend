const express = require("express");
const router = express.Router();
const PostsCtrl = require("../controllers/controller.posts");
const AuthCtrl = require("../controllers/controller.auth");

router.get(
  "/",
  AuthCtrl.onlyAuthUser,
  (req, res, next) =>
    AuthCtrl.authenticateAndPermissions(req, res, "READ_POSTS", next),
  PostsCtrl.getPosts
);

module.exports = router;
