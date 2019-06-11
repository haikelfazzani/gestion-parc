const db = require("../database/DbConnection");
const Etat = require("../models/Etat.enum");

class ReservationDao {

    constructor() {
        this.tableName = "reservation";
        this.vehiculeTable = "vehicule";
        this.userTable = "utilisateur";

        this.utilisateurId = "id";
        this.vehiculeId = "id_vehicule";
        // fields
        this.dateDepart = "date_depart";
        this.dateRetour = "date_retour";
        this.bossOrder = "boss_order";
        this.descMission = "desc_mission";
        this.userId = "user_id";
        this.vehiculeId = "vehicule_id";
    }


    getAllReservations(resolve) {

        const sql = `select * from ${this.tableName} r 
        join ${this.userTable} u on r.user_id = u.id
        join ${this.vehiculeTable} v on r.vehicule_id = v.id_vehicule
        where v.etat = 'en attente' `;

        db.query(sql, (err, rows) => {

            if (!err) {
                resolve({
                    error: "",
                    data: rows
                });
            }
            else {
                resolve({
                    error: "erreur !",
                    data: ""
                });
            }
        });
    }


    // change status of vehicule from "en attente" to "reservée"
    confirmer(vehiculeId, resolve) {

        const sql = `update ${this.vehiculeTable} set etat = 'réservée'
        where id_vehicule = ${vehiculeId} `;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "une reservation a été bien confrimée"
                });
            }
            else {
                resolve({
                    error: "erreur de confirmation!",
                    data: ""
                });
            }

        });
    }



    // remove the reservation
    annuler(userId, vehiculeId, resolve) {

        const sql = `delete from ${this.tableName} where ${this.userId} = ${userId}`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "une reservation a été bien annulée"
                });
                this.modifierEtatVehicule(vehiculeId, Etat.nonReserved, resolveMod => { });
            }
            else {
                resolve({
                    error: "erreur d'annulation",
                    data: ""
                });
            }
        });
    }


    modifierEtatVehicule(vehiculeId, etat = Etat.enAttente, resolve) {

        const sql = `update ${this.vehiculeTable} set etat = '${etat}'
        where id_vehicule = ${vehiculeId} `;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({ data: true });
            }
            else {
                resolve({ data: false });
            }
        });
    }



    /* Utilisateur reservation handling */
    envoyerDemande(reservation, resolve) {

        let { dateDepart, dateRetour, bossOrder, descMission, userId, vehiculeId } = reservation;

        const sql = `insert into 
        ${this.tableName} (date_depart,date_retour,boss_order,desc_mission,user_id,vehicule_id)
        values(
            '${dateDepart}' ,'${dateRetour}' ,'${bossOrder}' ,'${descMission}' ,
            ${userId} ,${vehiculeId} 
        )`;


        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "votre demande a été bien envoyée"
                });

                // update vehicule stat after client send demand
                this.modifierEtatVehicule(vehiculeId, "en attente", resolve => {

                });
            }
            else {
                resolve({
                    error: "erreur d'envoie",
                    data: ""
                });
            }
        });

    }


    // les vehicules reservées par utilisateurs
    listerReserved(userId, resolve) {

        const sql = `select * from ${this.tableName} r 
        join ${this.userTable} u on r.user_id = u.id
        join ${this.vehiculeTable} v on r.vehicule_id = v.id_vehicule
        where r.user_id = ${userId}`;

        db.query(sql, (err, rows) => {

            resolve({
                error: err,
                data: rows
            });
        });
    }        

}




module.exports = new ReservationDao();
