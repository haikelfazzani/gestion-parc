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



    // change status of vehicule from "en attente" to "reservée"
    confirmer(vehiculeId, resolve) {

        const sql = `update ${this.vehiculeTable} 
        set etat = ${Etat.reserve}
        where ${this.vehiculeId} = ${vehiculeId}`;

        db.query(sql, (err, rows) => {

        });
    }



    // remove the reservation
    annuler(userId, resolve) {

        const sql = `delete from ${this.tableName} where ${this.userId} = ${userId}`;

        db.query(sql, (err, rows) => {

        });
    }



    envoyerDemande(reservation, resolve) {

        let { dateDepart, dateRetour, bossOrder, descMission, userId, vehiculeId } = reservation;

        const sql = `insert into ${this.tableName} 
        values(
            '${dateDepart}' ,'${dateRetour}' ,'${bossOrder}' ,'${descMission}' ,
            ${userId} ,${vehiculeId} 
        )`;

        db.query(sql, (err, rows) => {

        });
    }

    // les vehicules non reservées
    listerReserved(resolve) {

        const sql = `select * from ${this.tableName} r 
        join ${this.userTable} u on r.user_id = u.id
        join ${this.vehiculeTable} v on r.vehicule_id = v.id_vehicule
        where v.etat = '${Etat.reserve}' and r.user_id = 1`;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
        });
    }

    // les vehicules non reservées
    lister(resolve) {

        const sql = `select * from ${this.vehiculeTable} where etat = '${Etat.nonReserved}'`;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
        });
    }

}




module.exports = new ReservationDao();
