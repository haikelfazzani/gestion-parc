const express = require("express");
const router = express.Router();


// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin, isNotAdmin } = require("../middlewares/permission.middleware");

const reservationController = require("../controllers/reservation.controller");


router.get("/", [redirectLogin], (req, res) => {
  res.render("reservations/index");
});




/** Admin routes reservations handling */
router.get("/list", [redirectLogin, isAdmin], (req, res) => {
  reservationController.listReservations(req, res);
});




router.get("/confirmer", [redirectLogin, isAdmin], (req, res) => {
  reservationController.rendConfirmerForm(req, res);
});

router.post("/confirmer", [redirectLogin, isAdmin], (req, res) => {
  reservationController.confirmer(req, res);
});




router.get("/annuler", [redirectLogin, isAdmin], (req, res) => {
  reservationController.rendAnnulerForm(req, res);
});

router.post("/annuler", [redirectLogin, isAdmin], (req, res) => {
  reservationController.annuler(req, res);
});



/** User routes reservation handling */
router.get("/user/list-vehicules", [redirectLogin, isNotAdmin], (req, res) => {
  reservationController.getAll(req, res);
});

router.get("/user/list-reserved", [redirectLogin, isNotAdmin], (req, res) => {
  reservationController.getAllReserved(req, res);
});


/** Client envoi une demande de reservation */
router.get("/user/reserver", [redirectLogin, isNotAdmin], (req, res) => {
  reservationController.rendFormReserver(req, res);
});

router.post("/user/reserver", [redirectLogin, isNotAdmin], (req, res) => {
  reservationController.envoyer(req, res);
});

module.exports = router;
