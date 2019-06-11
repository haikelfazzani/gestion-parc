const reservationDao = require("../dao/reservation.dao");
let Reservation = require("../models/Reservation.model");
let Etat = require("../models/Etat.enum");
let vehiculeDao = require("../dao/vehicule.dao");

class ReservationController {

    async rendConfirmerForm(req, res) {

        if (req.session && req.session.reservationsUsers) {

            let vehiculeId = req.query.v;
            let { reservationsUsers } = req.session;
            let reserv = reservationsUsers.find(r => r.id_vehicule == vehiculeId);

            req.session.vehiculeIdToConfirm = vehiculeId;

            await res.render("reservations/admin/confirmer", { data: reserv });
        }
        else {
            await res.render("reservations/admin/confirmer");
        }

    }

    confirmer(req, res) {

        let { vehiculeIdToConfirm } = req.session;

        reservationDao.confirmer(parseInt(vehiculeIdToConfirm), async (resolve) => {

            await res.render("reservations/admin/confirmer",
                { msg: resolve.data || resolve.error }
            );
        });
    }

    async rendAnnulerForm(req, res) {

        if (req.session && req.session.reservationsUsers) {

            let vehiculeId = req.query.v;
            let userId = req.query.u;


            let { reservationsUsers } = req.session;
            let reserv = reservationsUsers.find(r => r.id_vehicule == vehiculeId);

            req.session.vehiculeIdToConfirm = vehiculeId;
            req.session.userToConfirm = userId;

            await res.render("reservations/admin/annuler", { data: reserv });
        }
        else {
            await res.render("reservations/admin/annuler");
        }
    }

    annuler(req, res) {
        let { vehiculeIdToConfirm, userToConfirm } = req.session;

        reservationDao.annuler(
            parseInt(userToConfirm), parseInt(vehiculeIdToConfirm),
            (resolve) => {

                res.render("reservations/admin/confirmer", { msg: resolve.data || resolve.error });
                return;

            });
    }

    // by all users
    listReservations(req, res) {
        reservationDao.getAllReservations(resolve => {

            const reservationsUsers = resolve.data;
            req.session.reservationsUsers = reservationsUsers;

            res.render("reservations/admin/list",
                { msg: resolve.error, data: resolve.data });
            return;

        });
    }



    /** User reservation handling */
    getAllReserved(req, res) {
        let { id } = req.session.userInfo;

        reservationDao.listerReserved(id, async (resolve) => {
            await res.render("reservations/user/list-reserved",
                { msg: resolve.error, data: resolve.data }
            );
        });
    }



    getAll(req, res) {
        vehiculeDao.getVehiculeByEtat(Etat.nonReserved, async (resolve) => {
            const vehicules = resolve.data;
            req.session.vehicules = vehicules;
            await res.render("reservations/user/list", { msg: resolve.error, data: vehicules });
        });
    }

    /** Client envoi une demande de reservation */
    async rendFormReserver(req, res) { // get

        const numserie = req.query.v;

        if (req.session && req.session.vehicules) {

            const { vehicules } = req.session;
            let vehicule = vehicules.find(v => v.num_serie === numserie);

            await res.render("reservations/user/reserver-form", { vehicule })
        }
        else {
            await res.render("reservations/user/list");
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

        reservationDao.envoyerDemande(reservation, async (resolve) => {
            await res.render("reservations/user/reserver-form",
                { msg: resolve.data || resolve.error }
            );
        });

    }

}

module.exports = new ReservationController();
