const express = require("express"), router = express.Router();
const { redirectLogin } = require('../middlewares/auth.middleware');
const profileController = require("../controllers/profile.controller");

const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.get("/", redirectLogin, async (req, res) => {
  await profileController.index(req, res);
});

router.post("/", redirectLogin, async (req, res) => {
  await profileController.updateUserPassword(req, res);
});


router.get("/avatar", redirectLogin, async (req, res) => {
  await profileController.getAvatar(req, res);
});


router.post("/avatar/update", [redirectLogin, upload.single("avatar")], async (req, res) => {
  await profileController.updateAvatar(req, res);
});


router.post("/avatar/add", [redirectLogin, upload.single("avatar")], (req, res) => {
  profileController.addAvatar(req, res);
});

module.exports = router;
