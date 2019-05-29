const express = require("express");
const { redirectLogin } = require('../middlewares/auth.middleware');
const router = express.Router();

const profileController = require("../controllers/profile.controller");

router.get("/", redirectLogin, (req, res) => {
  res.render("profile/index");
});

router.post("/", redirectLogin, (req, res) => {
  profileController.modifier(req, res);
});

module.exports = router;
