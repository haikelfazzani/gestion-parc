const db = require("../database/DbConnection");
const Etat = require("../models/Etat.enum");
const notificationDao = require("../dao/notification.dao");
const Notification = require("../models/Notification.model");

let { formatLongDate } = require("../service/date.service");

const { utilisateurTable, vehiculeTable, reservTable } = require("../database/migration");
const adminId = 1;

class ReservationDao {

    async listRequests(resolve) {

        const sql = `select * from ${reservTable.tableName} r 
        join ${utilisateurTable.tabelName} u on r.utilisateur_id = u.id_utilisateur
        join ${vehiculeTable.tableName} v on r.vehicule_id = v.id_vehicule
        where v.etat = '${Etat.enAttente}' `;

        await db.query(sql, (err, rows) => {

            resolve({
                error: err ? "erreur !" : "",
                data: err ? "" : rows
            });
        });
    }


    // change status of vehicule from "en attente" to "reservée"
    confirm(userId, vehiculeId, resolve) {

        const sql = `update ${vehiculeTable.tableName} 
        set ${vehiculeTable.etatField} = '${Etat.reserve}'
        where ${vehiculeTable.vIdField} = ${vehiculeId} `;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "erreur de confirmation" : "",
                data: err ? "" : "une reservation a été bien confrimée"
            });

            // add notification to database to this user id                            
            notificationDao.addNotif(formatLongDate(),
                new Notification("votre demande a été confirmée", userId), (res) => { });
        });
    }



    // remove the reservation
    cancel(userId, vehiculeId, resolve) {

        const sql = `delete from ${reservTable.tableName} 
        where ${reservTable.vehiculeIdRes} = ${vehiculeId}
        and ${reservTable.userIdRes} = ${userId}`;

        db.query(sql, (err, rows) => {
            
            if (!err) {

                resolve({ error: "", data: "une reservation a été bien annulée" });
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

        const sql = `update ${vehiculeTable.tableName} 
        set ${vehiculeTable.etatField} = '${etat}'
        where ${vehiculeTable.vIdField} = ${vehiculeId} `;

        db.query(sql, (err, rows) => {
            resolve({ data: err ? false : true });
        });
    }


    history(resolve) {
        const sql = `select * from ${reservTable.tableName} r 
        join ${utilisateurTable.tabelName} u on r.utilisateur_id = u.id_utilisateur
        join ${vehiculeTable.tableName} v on r.vehicule_id = v.id_vehicule`;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: err ? "" : rows
            });
        });
    }



    /* -------- Utilisateur reservation handling ---------- */
    sendDemand(reservation, resolve) {

        let { dateDepart, dateRetour, bossOrder, descMission, userId, vehiculeId } = reservation;

        const sql = `insert into ${reservTable.tableName} (
            ${reservTable.dateDepart},
            ${reservTable.dateRetour},
            ${reservTable.bossOrder},
            ${reservTable.descMission},
            ${reservTable.userIdRes},
            ${reservTable.vehiculeIdRes}
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
                this.updateEtatVehicule(vehiculeId, Etat.enAttente, (resolve) => {});

                notificationDao.addNotif(formatLongDate(), new Notification(
                    "une nouvelle demande de reservation", adminId), (res) => { });
            }
            else {
                resolve({ error: "erreur d'envoie", data: "" });
            }
        });

    }


    // les vehicules reservées par utilisateurs
    listReserved(userId, resolve) {

        const sql = `select * from ${reservTable.tableName} r 
        join ${utilisateurTable.tabelName} u on r.utilisateur_id = u.id_utilisateur
        join ${vehiculeTable.tableName} v on r.vehicule_id = v.id_vehicule
        where r.utilisateur_id = ${userId}`;

        db.query(sql, (err, rows) => {
            resolve({ error: err, data: rows });
        });
    }




    // check date retour and updated etat vehicule
    checkVehiculeDateBack(utilisateur_id, id_vehicule, etat, resolve) {
        this.cancel(utilisateur_id, id_vehicule, (reslve) => {
            this.updateEtatVehicule(id_vehicule, etat, (r) => {
                resolve({ reslve, r })
            });
        });
    }


}

module.exports = new ReservationDao();
