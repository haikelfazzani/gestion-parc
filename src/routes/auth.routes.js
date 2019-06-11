const express = require("express");
const { redirectHome } = require("../middlewares/auth.middleware");
let utilisateurDao = require("../dao/utilisateur.dao");
const path = require("path");

const router = express.Router();
let isConnected = false;

router.get('/login', redirectHome, (req, res) => {
  return res.render("login")
});


router.post('/login', redirectHome, (req, res) => {
  let { email, password } = req.body;

  utilisateurDao.getOneByEmail(email, password, (resolve) => {

    if (resolve.data && resolve.data.length > 0) {
      isConnected = true;
      req.session.userInfo = resolve.data[0];
      res.cookie('user', JSON.stringify(resolve.data[0]), 
          { expires: new Date(Date.now() + 900000) })
      .redirect("/");
      return;
    }
    else {
      res.render("login", { msg: "utilisateur n'existe pas!!" });
      return;
    }
  });
});


router.get('/logout', (req, res) => {
  req.session.destroy();
  req.session = null;
  res.locals = null;
  res.redirect("/auth/login");
});


module.exports = router;
