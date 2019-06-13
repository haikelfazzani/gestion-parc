const express = require("express"),
  router = express.Router(),
  { redirectHome } = require("../middlewares/auth.middleware"),
  userDao = require("../dao/user.dao"),
  path = require("path");

const inputValidator = require('../service/validator.service');
const staticFiles = require("../config/static.config");

router.get('/login', redirectHome, async (req, res) => {
  await res.render("login", { staticFiles });
});


router.post('/login', redirectHome, async (req, res) => {
  let { email, password } = req.body;

  if (inputValidator.isPassword(password) && inputValidator.isEmail(email)) {
    await userDao.getOneByEmail(email, password, (resolve) => {

      if (resolve.data && resolve.data.length > 0) {

        req.session.userInfo = resolve.data[0];
        res.cookie('user', JSON.stringify(resolve.data[0]),
          { expires: new Date(Date.now() + 900000) })
          .redirect("/");

        return;
      }
      else {
        res.render("login",
          {
            msg: "L'adresse e-mail ou le mot de passe que vous avez entré n'est pas valide. Réessayez.",
            staticFiles
          }
        );
        return;
      }
    });
  }
  else {
    res.render("login",
      {
        msg: "L'adresse e-mail ou le mot de passe que vous avez entré n'est pas valide. Réessayez.",
        staticFiles
      }
    );
    return;
  }

});


router.get('/logout', async (req, res) => {
  req.session.destroy();
  req.session = null;
  res.locals = null;
  await res.redirect("/auth/login");
});


module.exports = router;
