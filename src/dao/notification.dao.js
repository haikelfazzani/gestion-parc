const db = require("../database/DbConnection");

class NotificationDao {

    constructor() {
        this.tableName = "notifications";
        // fields
        this.idNotif = "id_notif";
        this.message = "message";
        this.etatNotif = "etat_notif";
        this.dateNotif = "date_notif";
        this.userId = "utilisateur_id";
    }

    addNotif(dateNotif, notification, resolve) {
        const { message, userId } = notification;
        const sql = `insert into ${this.tableName} (
            ${this.message}, 
            ${this.dateNotif},
            ${this.userId}
            ) 
        values('${message}', '${dateNotif}',${userId})`;

        db.query(sql, (err, rows) => {
            resolve({ err, rows });            
        });
    }

    // update notif etat from 0 -> 1 when usre lick on notification icon
    updateEtatNotif(resolve) {
        const sql = `update ${this.tableName} set ${this.etatNotif} = 1`;
        db.query(sql, (err, rows) => {
            if (!err) resolve({ error: "", data: "notification mise à jour" });
        });
    }

    deleteNotif(resolve) { }

    getNotifs(userId, resolve) {
        const sql = `select * from ${this.tableName} 
        where ${this.etatNotif} = 1 and ${this.userId} = ${userId}`;

        db.query(sql, (err, rows) => {
            if (!err) resolve({ error: "", data: rows });
        });
    }

    getNotifsUnread(userId, resolve) {
        const sql = `select * from ${this.tableName} 
        where ${this.etatNotif} = 0 and ${this.userId} = ${userId}`;

        db.query(sql, (err, rows) => {
            if (!err) resolve({ error: "", data: rows });
        });
    }
}

module.exports = new NotificationDao();
