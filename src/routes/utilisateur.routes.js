const express = require("express");
const router = express.Router();

// controller
const utilisateurController = require('../controllers/utilisateur.controller');

// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin } = require("../middlewares/permission.middleware");


router.get("/", [redirectLogin, isAdmin], async (req, res) => {
  //await utilisateurController.root(req, res)
  await res.render("users/index");
});

/** Add user to database */
router.get("/add", [redirectLogin, isAdmin], async (req, res) => {
  await res.render("users/add-user")
});


router.post("/add", [redirectLogin, isAdmin], async (req, res) => {
  await utilisateurController.addUser(req, res)
});



/** modifier user */
router.get("/update", [redirectLogin, isAdmin], async (req, res) => {
  await utilisateurController.getUserByEmail(req, res);
});

router.post("/update", [redirectLogin, isAdmin], async (req, res) => {
  await utilisateurController.updateUser(req, res)
});



/** supprimer user from database */
router.get("/delete", [redirectLogin, isAdmin], async (req, res) => {
  await utilisateurController.getUserByEmail(req, res);
});

router.post("/delete", [redirectLogin, isAdmin], async (req, res) => {
  await utilisateurController.deleteUser(req, res)
});



/** Get all user from database */
router.get("/list", [redirectLogin, isAdmin], async (req, res) => {
  await utilisateurController.getUsers(req, res);
});


module.exports = router;
