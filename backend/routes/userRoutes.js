const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController")

router.route("/register")
      .post(usersController.registerUser)
router.route("/login")
      .post(usersController.loginUser);


module.exports = router;