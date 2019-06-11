const express = require("express"), router = express.Router(),
  { redirectLogin } = require('../middlewares/auth.middleware');


router.get("/", redirectLogin, (req, res) => {
  res.render("index");
});


module.exports = router;