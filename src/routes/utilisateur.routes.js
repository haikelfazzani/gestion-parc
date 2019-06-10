const express = require("express");
const router = express.Router();

// controller
const utilisateurController = require('../controllers/utilisateur.controller');

// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin } = require("../middlewares/permission.middleware");


router.get("/", [redirectLogin, isAdmin], (req, res) => {
  //await utilisateurController.root(req, res)
  res.render("users/index");
});

/** Add user to database */
router.get("/ajout", [redirectLogin, isAdmin], (req, res) => {

  res.render("users/ajout")

});


router.post("/ajout", [redirectLogin, isAdmin], (req, res) => {
  utilisateurController.ajouter(req, res)
});



/** modifier user */
router.get("/modifier", [redirectLogin, isAdmin], (req, res) => {
  utilisateurController.getUserByEmail(req, res);
});

router.post("/modifier", [redirectLogin, isAdmin], (req, res) => {
  utilisateurController.modifier(req, res)
});



/** supprimer user from database */
router.get("/supprimer", [redirectLogin, isAdmin], (req, res) => {
  utilisateurController.getUserByEmail(req, res);
});

router.post("/supprimer", [redirectLogin, isAdmin], (req, res) => {
  utilisateurController.supprimer(req, res)
});



/** Get all user from database */
router.get("/list", [redirectLogin, isAdmin], (req, res) => {
  utilisateurController.getAll(req, res);
});


module.exports = router;