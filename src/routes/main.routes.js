const express = require("express"), router = express.Router(),
  { redirectLogin } = require('../middlewares/auth.middleware');


router.get("/", redirectLogin, async (req, res) => {
  await res.render("index");
});


module.exports = router;