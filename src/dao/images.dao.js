const db = require("../database/DbConnection");
const { imgTable } = require("../database/migration");

class ImagesDao {

    getAvatar(userId, resolve) {
        const sql = `select ${imgTable.avatar} from ${imgTable.tableName}
        where ${imgTable.userId} = ${userId} `;

        db.query(sql, (err, rows) => {
            resolve({
                error: err ? "aucun avatar a été trouvé" : "",
                data: err ? "" : rows
            });
        });
    }

    updateAvatar(userId, avatar, resolve) {
        const sql = `update ${imgTable.tableName} 
        set ${imgTable.avatar} = '${avatar}' where ${imgTable.userId} = ${userId} `;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? err : "",
                data: err ? "" : "votre image a été bien modifiée"
            });
        });
    }

    addAvatar(userId, avatar, resolve) {
        const sql = `insert into ${imgTable.tableName} (${imgTable.avatar}, ${imgTable.userId})
        values('${avatar}', ${userId})`;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? err : "",
                data: err ? "" : "votre image a été bien insérée"
            });
        });
    }
}


module.exports = new ImagesDao();
