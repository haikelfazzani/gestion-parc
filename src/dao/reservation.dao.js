const db = require("../database/DbConnection");
const Etat = require("../models/Etat.enum");
const notificationDao = require("../dao/notification.dao");
const Notification = require("../models/Notification.model");

let { formatLongDate } = require("../service/date.service");

class ReservationDao {

    constructor() {
        this.tableName = "reservations";
        // fields
        this.dateDepart = "date_depart";
        this.dateRetour = "date_retour";
        this.bossOrder = "boss_order";
        this.descMission = "desc_mission";
        this.userIdRes = "user_id";
        this.vehiculeIdRes = "vehicule_id";

        // other tables        
        this.vehiculeTable = "vehicules";
        this.userTable = "users";

        this.utilisateurId = "id_user";
        this.vehiculeId = "id_vehicule";
    }


    async listRequests(resolve) {

        const sql = `select * from ${this.tableName} r 
        join ${this.userTable} u on r.user_id = u.id_user
        join ${this.vehiculeTable} v on r.vehicule_id = v.id_vehicule
        where v.etat = '${Etat.enAttente}' `;

        await db.query(sql, (err, rows) => {

            if (!err) {
                resolve({ error: "", data: rows });
            }
            else {
                resolve({ error: "erreur !", data: "" });
            }
        });
    }


    // change status of vehicule from "en attente" to "reservée"
    confirm(userId, vehiculeId, resolve) {

        const sql = `update ${this.vehiculeTable} set etat = '${Etat.reserve}'
        where ${this.vehiculeId} = ${vehiculeId} `;

        db.query(sql, (err, rows) => {
            if (!err) {
                const msg = "une reservation a été bien confrimée";
                resolve({ error: "", data: msg });

                // add notification to database to this user id                            
                notificationDao.addNotif(formatLongDate(), 
                new Notification("votre demande a été confirmée", userId), (res) => { });
            }
            else {
                resolve({ error: "erreur de confirmation", data: "" });
            }
        });
    }



    // remove the reservation
    cancel(userId, vehiculeId, resolve) {

        const sql = `delete from ${this.tableName} 
        where ${this.vehiculeIdRes} = ${vehiculeId}
        and ${this.userIdRes} = ${userId}`;

        db.query(sql, (err, rows) => {
            if (!err) {
                const msg = "une reservation a été bien annulée";
                resolve({ error: "", data: msg });
                // update vehicule etat from enAttente => nonReserve
                this.updateEtatVehicule(vehiculeId, Etat.nonReserved, (resolveMod) => { });

                // add notification to database to this user id
                const note = "votre demande a été annulée";
                notificationDao.addNotif(formatLongDate(), new Notification(note, userId), (res) => { });

            }
            else {
                resolve({ error: "erreur d'annulation", data: "" });
            }

        });
    }


    updateEtatVehicule(vehiculeId, etat = Etat.enAttente, resolve) {

        const sql = `update ${this.vehiculeTable} set etat = '${etat}'
        where ${this.vehiculeId} = ${vehiculeId} `;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({ data: true });
            }
            else {
                resolve({ data: false });
            }
        });
    }


    history(resolve) {
        const sql = `select * from ${this.tableName} r 
        join ${this.userTable} u on r.user_id = u.id_user
        join ${this.vehiculeTable} v on r.vehicule_id = v.id_vehicule`;

        db.query(sql, (err, rows) => {
            resolve({ error: err, data: rows });
        });
    }



    /* -------- Utilisateur reservation handling ---------- */
    sendDemand(reservation, resolve) {

        let { dateDepart, dateRetour, bossOrder, descMission, userId, vehiculeId } = reservation;

        const sql = `insert into ${this.tableName} (
            ${this.dateDepart},
            ${this.dateRetour},
            ${this.bossOrder},
            ${this.descMission},
            ${this.userIdRes},
            ${this.vehiculeIdRes}
        )
        values(
            '${dateDepart}' ,'${dateRetour}' ,
            '${bossOrder}' ,'${descMission}' ,
            ${userId} ,${vehiculeId} 
        )`;


        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({ error: "", data: "votre demande a été bien envoyée" });

                // update vehicule status after client send demand
                this.updateEtatVehicule(vehiculeId, "en attente", (resolve) => { });

                notificationDao.addNotif(formatLongDate(), new Notification(
                    "une nouvelle demande de reservation", 1), (res) => { });
            }
            else {
                resolve({ error: "erreur d'envoie", data: "" });
            }
        });

    }


    // les vehicules reservées par utilisateurs
    listReserved(userId, resolve) {

        const sql = `select * from ${this.tableName} r 
        join ${this.userTable} u on r.user_id = u.id_user
        join ${this.vehiculeTable} v on r.vehicule_id = v.id_vehicule
        where r.user_id = ${userId}`;

        db.query(sql, (err, rows) => {

            resolve({ error: err, data: rows });
        });
    }




    // check date retour and updated etat vehicule
    checkVehiculeDateBack(user_id, id_vehicule, etat, resolve) {
        this.cancel(user_id, id_vehicule, (reslve) => {
            this.updateEtatVehicule(id_vehicule, etat, (r) => {
                resolve({ reslve, r })
            });
        });
    }


}

module.exports = new ReservationDao();
