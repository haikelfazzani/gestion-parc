const express = require("express");
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get("/", authMiddleware.redirectLogin, (req, res) => {  
  res.render("profile/index");
});



module.exports = router;