const express = require("express");
const router = express.Router();
const UsersCtrl = require("../controllers/controller.users");

router.post("/login", UsersCtrl.login);

module.exports = router;
