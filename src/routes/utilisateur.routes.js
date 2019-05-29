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



/** Update user */
router.get("/update", [redirectLogin, isAdmin], (req, res) => {
  res.render("users/ajout")
});

router.post("/update", [redirectLogin, isAdmin], (req, res) => {
  utilisateurController.ajouter(req, res)
});



/** Delete user from database */
router.get("/delete", [redirectLogin, isAdmin], (req, res) => {
  res.render("users/ajout")
});

router.post("/delete", [redirectLogin, isAdmin], (req, res) => {
  utilisateurController.ajouter(req, res)
});



/** Get all user from database */
router.get("/list", [redirectLogin, isAdmin], (req, res) => {
  utilisateurController.getAll(req, res);
});


module.exports = router;