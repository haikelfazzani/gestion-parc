const reservationDao = require("../dao/reservation.dao");
let Reservation = require("../models/Reservation.model");

class ReservationController {

    confirmer(req, res) { }

    annuler(req, res) { }

    // by all users
    listReservations(req, res) {
        reservationDao.getAllReservations(resolve => {
            const reservations = resolve.data;
            req.session.reservations = reservations;

            res.render("reservations/admin/list",
                { msg: resolve.error, data: resolve.data });
            return;

        });
    }



    /** User reservation handling */
    getAllReserved(req, res) {
        let { id } = req.session.userInfo;

        reservationDao.listerReserved(id, (resolve) => {
            res.render("reservations/user/list-reserved",
                { msg: resolve.error, data: resolve.data });
            return;
        });
    }

    getAll(req, res) {
        reservationDao.lister((resolve) => {
            const vehicules = resolve.data;
            req.session.vehicules = vehicules;
            res.render("reservations/user/list", { msg: resolve.error, data: vehicules });
            return;
        });
    }

    /** Client envoi une demande de reservation */
    rendFormReserver(req, res) { // get

        const numserie = req.query.v;

        if (req.session && req.session.vehicules) {

            const { vehicules } = req.session;
            let vehicule = vehicules.find(v => v.num_serie === numserie);

            res.render("reservations/user/reserver-form", { vehicule })
            return;
        }
        else {
            res.render("reservations/user/list");
            return;
        }
    }

    envoyer(req, res) { // post

        let { dateDepart, dateRetour, bossOrder, descMission, numSerie } = req.body;
        let { vehicules, userInfo } = req.session;
        let vehicule = vehicules.find(v => v.num_serie === numSerie.trim());

        let reservation = new Reservation(
            dateDepart,
            dateRetour,
            bossOrder,
            descMission.trim(),
            userInfo.id,
            vehicule.id_vehicule
        );

        reservationDao.envoyerDemande(reservation, resolve => {
            res.render("reservations/user/reserver-form", { msg: resolve.data || resolve.error })
            return;
        });

    }

}

module.exports = new ReservationController();
