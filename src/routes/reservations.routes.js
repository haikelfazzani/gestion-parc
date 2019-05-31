const express = require("express");
const router = express.Router();


// middlewares
const { redirectLogin } = require('../middlewares/auth.middleware');
const { isAdmin } = require("../middlewares/permission.middleware");

const reservationController = require("../controllers/reservation.controller");


router.get("/", [redirectLogin, isAdmin], (req, res) => {
  res.render("reservations/index");
});

router.get("/list-vehicules", [redirectLogin, isAdmin], (req, res) => {
  reservationController.getAll(req, res);
});

router.get("/list-reserved", [redirectLogin, isAdmin], (req, res) => {
  reservationController.getAllReserved(req, res);
});


module.exports = router;