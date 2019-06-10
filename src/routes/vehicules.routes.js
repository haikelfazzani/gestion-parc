const express = require("express");
const router = express.Router();

// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin } = require("../middlewares/permission.middleware");

// controller
const vehiculeController = require("../controllers/vehicule.controller");


// index : main route
router.get("/", [redirectLogin, isAdmin], (req, res) => {
    res.render("vehicules/index");
});




/** Add vehicule to database */
router.get("/ajout", [redirectLogin, isAdmin], (req, res) => {
    res.render("vehicules/ajout")
});


router.post("/ajout", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.ajouter(req, res);
});






/** Update vehicule */
router.get("/modifier", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.getVehicule(req, res);
});

router.post("/modifier", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.update(req , res);
});



/** Delete vehicule from database */
router.get("/supprimer", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.getVehicule(req, res);
});

router.post("/supprimer", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.supprimer(req , res);
});





/** Get all vehicules from database */
router.get("/list", [redirectLogin, isAdmin], (req, res) => {    
    vehiculeController.getAll(req, res);
});


module.exports = router;