
const reservationDao = require("../dao/reservation.dao");

class ReservationController {

    confirmer() { }

    annuler() { }

    getAllReserved(req, res) {
        let { id } = req.session.userInfo;

        reservationDao.listerReserved(id, (resolve) => {
            res.render("reservations/list-reserved", { msg: resolve.error, data: resolve.data });
            return;
        });
    }

    getAll(req, res) {
        reservationDao.lister((resolve) => {
            const vehicules = resolve.data;
            req.session.vehicules = vehicules;
            res.render("reservations/list", { msg: resolve.error, data: vehicules });
            return;
        });
    }

    /** Client une demande de reservation */
    reserver(req, res, numserie) { // get
        if (req.session && req.session.vehicules) {
            let { vehicules, userInfo } = req.session;
            let vehicule = vehicules.find(v => v.num_serie = numserie);

            res.render("reservations/reserver-form", { vehicule })
            return;
        }
        res.render("reservations/reserver-form")
    }

}

module.exports = new ReservationController();
