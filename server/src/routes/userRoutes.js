const express = require("express");
const router = express.Router();

const { register, login, facebookLogin } = require("../controlers/userControlers");
const auth = require("../midleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/facebook-login", facebookLogin);

module.exports = router;
