const express = require("express");
const router = express.Router();

const { createUser, login, userProfile } = require("../controllers/auth");
const {
  validateNewUser,
  validateLogin,
  validateToken,
} = require("../middlewares/auth");
const { ADMIN, USER } = require("../constants/auth");

router.route("/register").post(validateNewUser, createUser);

router.route("/login").post(validateLogin, login);
router.route("/profile").get(validateToken(ADMIN,USER), userProfile);
module.exports = router;
