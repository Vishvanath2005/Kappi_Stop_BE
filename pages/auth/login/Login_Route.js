const express = require("express");
const router = express.Router();
const LoginController = require("./Login_Controller");

router.post("/login", LoginController.simpleLogin);

module.exports = router;