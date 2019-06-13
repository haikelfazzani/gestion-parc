const reservationDao = require("../dao/reservation.dao");
let Reservation = require("../models/Reservation.model");
let Etat = require("../models/Etat.enum");
let vehiculeDao = require("../dao/vehicule.dao");

class ReservationController {

    async rendConfirmForm(req, res) {

        if (req.session && req.session.reservationsUsers) {

            let vehiculeId = req.query.v;
            let { reservationsUsers } = req.session;
            let reserv = reservationsUsers.find(r => r.id_vehicule == vehiculeId);

            req.session.vehiculeIdToConfirm = vehiculeId;

            await res.render("reservations/admin/confirm", { data: reserv });
        }
        else {
            await res.render("reservations/admin/confirm");
        }

    }

    async confirm(req, res) {

        let { vehiculeIdToConfirm } = req.session;

        await reservationDao.confirm(parseInt(vehiculeIdToConfirm), async (resolve) => {

            await res.render("reservations/admin/confirm",
                { msg: resolve.data || resolve.error }
            );
        });
    }

    async rendCancelForm(req, res) {

        if (req.session && req.session.reservationsUsers) {

            let vehiculeId = req.query.v;
            let userId = req.query.u;


            let { reservationsUsers } = req.session;
            let reserv = reservationsUsers.find(r => r.id_vehicule == vehiculeId);

            req.session.vehiculeIdToConfirm = vehiculeId;
            req.session.userToConfirm = userId;

            await res.render("reservations/admin/cancel", { data: reserv });
        }
        else {
            await res.render("reservations/admin/cancel");
        }
    }

    async cancel(req, res) {
        let { vehiculeIdToConfirm, userToConfirm } = req.session;

        await reservationDao.cancel(
            parseInt(userToConfirm), parseInt(vehiculeIdToConfirm), async (resolve) => {

                await res.render("reservations/admin/confirm",
                    { msg: resolve.data || resolve.error }
                );
            });
    }

    // by all users
    async listDemands(req, res) {
        await reservationDao.listRequests(async (resolve) => {

            let reservationsUsers = resolve.data;
            req.session.reservationsUsers = reservationsUsers;

            await res.render("reservations/admin/list-demands",
                { msg: resolve.error, data: reservationsUsers }
            );
        });
    }

    async history(req, res) {
        await reservationDao.history(async (resolve) => {

            let historyRes = resolve.data;
            req.session.historyRes = historyRes;

            await res.render("reservations/admin/history",
                { msg: resolve.error, data: historyRes }
            );
        });
    }



    /** User reservation handling */
    async getAllReserved(req, res) {
        let { id } = req.session.userInfo;

        await reservationDao.listReserved(id, async (resolve) => {
            await res.render("reservations/user/list-reserved",
                { msg: resolve.error, data: resolve.data }
            );
        });
    }



    async vehiculesNonReserved(req, res) {
        await vehiculeDao.getVehiculeByEtat(Etat.nonReserved, async (resolve) => {
            const vehicules = resolve.data;
            req.session.vehicules = vehicules;
            await res.render("reservations/user/list", { msg: resolve.error, data: vehicules });
        });
    }

    /** Client envoi une demande de reservation */
    async rendFormDemand(req, res) { // get

        const numserie = req.query.v;

        if (req.session && req.session.vehicules) {

            let { vehicules } = req.session;
            let vehicule = vehicules.find(v => v.num_serie === numserie);

            await res.render("reservations/user/demand-form", { vehicule })
        }
        else {
            await res.render("reservations/user/list");
        }
    }

    async sendDemand(req, res) { // post

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

        await reservationDao.sendDemand(reservation, async (resolve) => {
            await res.render("reservations/user/demand-form",
                { msg: resolve.data || resolve.error }
            );
        });

    }

}

module.exports = new ReservationController();
