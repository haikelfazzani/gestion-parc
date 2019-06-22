const db = require("../database/DbConnection");
const { notifTable } = require("../database/migration");

class NotificationDao {

    async addNotif(dateNotif, notification, resolve) {
        const { message, userId } = notification;
        const sql = `insert into ${notifTable.tableName} (
            ${notifTable.message}, ${notifTable.dateNotif}, ${notifTable.userId}
        ) 
        values('${message}', '${dateNotif}', ${userId} )`;

        await db.query(sql, async (err, rows) => {
            await resolve({ err, rows });
        });
    }

    // update notif etat from 0 -> 1 when usre lick on notification icon
    updateEtatNotif(resolve) {
        const sql = `update ${notifTable.tableName} set ${notifTable.etatNotif} = 1`;
        db.query(sql, (err, rows) => {
            if (!err) resolve({ error: "", data: "notification mise à jour" });
        });
    }

    deleteNotif(resolve) { }

    getNotifs(userId, resolve) {
        const sql = `select * from ${notifTable.tableName} 
        where ${notifTable.etatNotif} = 1 
        and ${notifTable.userId} = ${userId}`;

        db.query(sql, (err, rows) => {
            if (!err) resolve({ error: "", data: rows });
        });
    }

    getNotifsUnread(userId, resolve) {
        const sql = `select * from ${notifTable.tableName} 
        where ${notifTable.etatNotif} = 0 
        and ${notifTable.userId} = ${userId}`;

        db.query(sql, (err, rows) => {
            if (!err) resolve({ 
                error: "", 
                data: rows 
            });
        });
    }
}

module.exports = new NotificationDao();
