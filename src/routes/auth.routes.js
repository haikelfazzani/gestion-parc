const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
let utilisateurDao = require("../dao/utilisateur.dao");

const router = express.Router();

router.get('/login', authMiddleware.redirectHome, (req, res) => {
  return res.render("login")
});


router.post('/login', authMiddleware.redirectHome, (req, res) => {
  let { email } = req.body;
  console.log(email)
  utilisateurDao.getOneByEmail(email, (resolve) => {

    if (resolve.data && resolve.data.length > 0) {
      req.session.userInfo = resolve.data[0];
      return res.redirect("/");
    }
    else {
      return res.render("login", { msg: "utilisateur n'existe pas!!" });
    }
  });
});


router.get('/logout', (req, res) => {
  req.session.destroy();
  req.session = null;
  res.locals = null;
  res.redirect("/auth/login")
});


module.exports = router;