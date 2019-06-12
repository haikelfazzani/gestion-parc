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
router.get("/add", [redirectLogin, isAdmin], (req, res) => {
    res.render("vehicules/add-vehicule")
});


router.post("/add", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.addVehicule(req, res);
});






/** Update vehicule */
router.get("/update", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.getVehicule(req, res);
});

router.post("/update", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.updateVehicule(req , res);
});



/** Delete vehicule from database */
router.get("/delete", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.getVehicule(req, res);
});

router.post("/delete", [redirectLogin, isAdmin], (req, res) => {
    vehiculeController.deleteVehicule(req , res);
});





/** Get all vehicules from database */
router.get("/list", [redirectLogin, isAdmin], (req, res) => {    
    vehiculeController.getVehicules(req, res);
});


module.exports = router;
