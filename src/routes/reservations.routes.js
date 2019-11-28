const express = require("express"), router = express.Router();

// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin, isNotAdmin } = require("../middlewares/permission.middleware");

const reservationController = require("../controllers/reservation.controller");


/** Admin routes reservations handling */
router.get("/list-demands", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.listDemands(req, res);
});


router.get("/confirm", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.rendConfirmForm(req, res);
});

router.post("/confirm", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.confirm(req, res);
});




router.get("/cancel", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.rendCancelForm(req, res);
});

router.post("/cancel", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.cancel(req, res);
});




router.get("/history", [redirectLogin, isAdmin], async (req, res) => {
  await reservationController.history(req, res);
});







/** User routes reservation handling */
router.get("/user/list-vehicules", [redirectLogin, isNotAdmin], async (req, res) => {
  await reservationController.vehiculesNonReserved(req, res);
});

router.get("/user/list-reserved", [redirectLogin, isNotAdmin], async (req, res) => {
  await reservationController.getAllReserved(req, res);
});


/** Client envoi une demande de reservation */
router.get("/user/reserve", [redirectLogin, isNotAdmin], async (req, res) => {
  await reservationController.rendFormDemand(req, res);
});

router.post("/user/reserve", [redirectLogin, isNotAdmin], async (req, res) => {
  await reservationController.sendDemand(req, res);
});

module.exports = router;
