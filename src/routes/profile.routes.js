const express = require("express"), router = express.Router();
const { redirectLogin } = require('../middlewares/auth.middleware');
const profileController = require("../controllers/profile.controller");

router.get("/", redirectLogin, (req, res) => {
  res.render("profile/index");
});

router.post("/", redirectLogin, (req, res) => {
  profileController.modifier(req, res);
});

module.exports = router;
