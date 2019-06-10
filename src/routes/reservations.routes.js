const express = require("express");
const router = express.Router();


// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin } = require("../middlewares/permission.middleware");

const reservationController = require("../controllers/reservation.controller");


router.get("/", [redirectLogin], (req, res) => {
  res.render("reservations/index");
});

router.get("/list-vehicules", [redirectLogin], (req, res) => {
  reservationController.getAll(req, res);
});

router.get("/list-reserved", [redirectLogin], (req, res) => {
  reservationController.getAllReserved(req, res);
});


/** Client envoi une demande de reservation */
router.get("/reserver", [redirectLogin], (req, res) => {
  let numserie = req.query.v;
  reservationController.reserver(req, res, numserie);
});

router.post("/reserver", [redirectLogin], (req, res) => {
  reservationController.reserver(req, res);
});

module.exports = router;
