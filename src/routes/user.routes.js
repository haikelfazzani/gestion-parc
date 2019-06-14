const express = require("express");
const router = express.Router();

// controller
const userController = require('../controllers/user.controller');

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
  await userController.addUser(req, res)
});



/** modifier user */
router.get("/update", [redirectLogin, isAdmin], async (req, res) => {
  await userController.getUserByEmail(req, res);
});

router.post("/update", [redirectLogin, isAdmin], async (req, res) => {
  await userController.updateUser(req, res)
});



/** supprimer user from database */
router.get("/delete", [redirectLogin, isAdmin], async (req, res) => {
  await userController.getUserByEmail(req, res);
});

router.post("/delete", [redirectLogin, isAdmin], async (req, res) => {
  await userController.deleteUser(req, res)
});



/** Get all user from database */
router.get("/list", [redirectLogin, isAdmin], async (req, res) => {
  await userController.getUsers(req, res);
});


module.exports = router;
