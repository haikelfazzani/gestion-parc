const express = require("express"), router = express.Router();

// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin, isNotAdmin } = require("../middlewares/permission.middleware");

const reservationController = require("../controllers/reservation.controller");


router.get("/", [redirectLogin], async (req, res) => {
  await res.render("reservations/index");
});

/** Admin routes reservations handling */
router.get("/list", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.listReservations(req, res);
});


router.get("/confirmer", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.rendConfirmerForm(req, res);
});

router.post("/confirmer", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.confirmer(req, res);
});




router.get("/annuler", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.rendAnnulerForm(req, res);
});

router.post("/annuler", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.annuler(req, res);
});



/** User routes reservation handling */
router.get("/user/list-vehicules", [redirectLogin, isNotAdmin], async (req, res) => {
  await reservationController.getAll(req, res);
});

router.get("/user/list-reserved", [redirectLogin, isNotAdmin], async (req, res) => {
  await reservationController.getAllReserved(req, res);
});


/** Client envoi une demande de reservation */
router.get("/user/reserver", [redirectLogin, isNotAdmin], async (req, res) => {
  await reservationController.rendFormReserver(req, res);
});

router.post("/user/reserver", [redirectLogin, isNotAdmin], async (req, res) => {
  await reservationController.envoyer(req, res);
});

module.exports = router;
