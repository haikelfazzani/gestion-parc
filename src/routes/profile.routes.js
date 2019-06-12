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
  profileController.modifier(req, res);
});


router.get("/avatar", redirectLogin, (req, res) => {
  profileController.getAvatar(req, res);
});


router.post("/avatar/modifier", [redirectLogin, upload.single("avatar")], (req, res) => {
  profileController.modifierAvatar(req, res);
});


router.post("/avatar/ajout", [redirectLogin, upload.single("avatar")], (req, res) => {
  profileController.ajouterAvatar(req, res);
});

module.exports = router;
