const utilisateurController = require('../controllers/utilisateur.controller');
const express = require("express");
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get("/", authMiddleware.redirectLogin, (req, res) => {
  //await utilisateurController.root(req, res)
  res.render("users/index");
});

/** Add user to database */
router.get("/ajout", authMiddleware.redirectLogin, (req, res) => {
  res.render("users/ajout")
});


router.post("/ajout", authMiddleware.redirectLogin, (req, res) => {
  utilisateurController.ajouter(req, res)
});



/** Update user */
router.get("/update", authMiddleware.redirectLogin, (req, res) => {
  res.render("users/ajout")
});

router.post("/update", authMiddleware.redirectLogin, (req, res) => {
  utilisateurController.ajouter(req, res)
});



/** Delete user from database */
router.get("/delete", authMiddleware.redirectLogin, (req, res) => {
  res.render("users/ajout")
});

router.post("/delete", authMiddleware.redirectLogin, (req, res) => {
  utilisateurController.ajouter(req, res)
});



/** Get all user from database */
router.get("/list", (req, res) => {
  utilisateurController.getAll(req, res);
});


module.exports = router;