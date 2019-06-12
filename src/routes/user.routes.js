const express = require("express");
const router = express.Router();

// controller
const userController = require('../controllers/user.controller');

// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin } = require("../middlewares/permission.middleware");


router.get("/", [redirectLogin, isAdmin], (req, res) => {
  //await utilisateurController.root(req, res)
  res.render("users/index");
});

/** Add user to database */
router.get("/add", [redirectLogin, isAdmin], (req, res) => {
  res.render("users/add-user")
});


router.post("/add", [redirectLogin, isAdmin], (req, res) => {
  userController.addUser(req, res)
});



/** modifier user */
router.get("/update", [redirectLogin, isAdmin], (req, res) => {
  userController.getUserByEmail(req, res);
});

router.post("/update", [redirectLogin, isAdmin], (req, res) => {
  userController.updateUser(req, res)
});



/** supprimer user from database */
router.get("/supprimer", [redirectLogin, isAdmin], (req, res) => {
  userController.getUserByEmail(req, res);
});

router.post("/supprimer", [redirectLogin, isAdmin], (req, res) => {
  userController.deleteUser(req, res)
});



/** Get all user from database */
router.get("/list", [redirectLogin, isAdmin], (req, res) => {
  userController.getUsers(req, res);
});


module.exports = router;
