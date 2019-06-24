const router = require("express").Router(),  
  { redirectHome } = require("../middlewares/auth.middleware");

const authController = require("../controllers/auth.controller");
const staticFiles = require("../config/static.config");

router.get('/login', redirectHome, async (req, res) => {
  await res.render("login", { staticFiles });
});


router.post('/login', redirectHome, async (req, res) => {
  await authController.login(req, res);
});


router.get('/logout', async (req, res) => {
  req.session.destroy();
  req.session = null;
  res.locals = null;
  await res.redirect("/auth/login");
});


module.exports = router;
