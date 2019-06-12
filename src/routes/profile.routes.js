const express = require("express"), router = express.Router();
const { redirectLogin } = require('../middlewares/auth.middleware');
const profileController = require("../controllers/profile.controller");

var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.get("/", redirectLogin, (req, res) => {
  profileController.index(req, res);
});

router.post("/", redirectLogin, (req, res) => {
  profileController.updateUserPassword(req, res);
});


router.get("/avatar", redirectLogin, (req, res) => {
  profileController.getAvatar(req, res);
});


router.post("/avatar/update", [redirectLogin, upload.single("avatar")], (req, res) => {
  profileController.updateAvatar(req, res);
});


router.post("/avatar/add", [redirectLogin, upload.single("avatar")], (req, res) => {
  profileController.addAvatar(req, res);
});

module.exports = router;
