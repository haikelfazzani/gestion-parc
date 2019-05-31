
const reservationDao = require("../dao/reservation.dao");

class ReservationController {

    confirmer() { }

    annuler() { }

    getAllReserved(req, res) {
        reservationDao.listerReserved((resolve) => {
            res.render("reservations/list-reserved", { msg: resolve.error, data: resolve.data });
            return;
        });
    }

    getAll(req, res) {
        reservationDao.lister((resolve) => {
            res.render("reservations/list", { msg: resolve.error, data: resolve.data });
            return;
        });
    }


}

module.exports = new ReservationController();
