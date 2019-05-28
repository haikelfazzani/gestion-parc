const express = require("express"),
  router = express.Router(),
  authMiddleware = require('../middlewares/auth.middleware');


router.get("/", authMiddleware.redirectLogin, (req, res) => {
  res.render("index");
});


module.exports = router;