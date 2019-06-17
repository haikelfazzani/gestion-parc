const express = require("express"), router = express.Router();
const { redirectLogin } = require('../middlewares/auth.middleware');
const notificationController = require("../controllers/notification.controller");


router.get("/", redirectLogin, async (req, res) => {
  await notificationController.index(req, res);
});

router.get("/read", redirectLogin, async (req, res) => {
  await notificationController.getNotifs(req, res);
});

router.get("/unread", redirectLogin, async (req, res) => {
  await notificationController.getNotifsUnread(req, res);
});


module.exports = router;
