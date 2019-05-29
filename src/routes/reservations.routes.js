const express = require("express");
const router = express.Router();


// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin } = require("../middlewares/permission.middleware");


router.get("/", [redirectLogin, isAdmin], (req, res) => {  
  res.render("reservations/index");
});


module.exports = router;