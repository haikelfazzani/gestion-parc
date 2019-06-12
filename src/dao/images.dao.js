const db = require("../database/DbConnection");

class ImagesDao {

    constructor() {
        this.tableName = "images";
        // fields
        this.id = "images_id";
        this.avatar = "avatar";
        this.userId = "user_id";

        this.userTable = "utilisateur";
    }

    getAvatar(userId, resolve) {
        const sql = `select ${this.avatar} from ${this.tableName}
        where ${this.userId} = ${userId} `;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
        });
    }

    updateAvatar(userId, avatar, resolve) {
        const sql = `update ${this.tableName} 
        set ${this.avatar} = '${avatar}' where ${this.userId} = ${userId} `;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "votre image a été bien modifiée"
                });
            }
            else {
                resolve({
                    error: err,
                    data: ""
                });
            }
        });
    }

    addAvatar(userId, avatar, resolve) {
        const sql = `insert into ${this.tableName} (${this.avatar}, ${this.userId})
        values('${avatar}', ${userId})`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "votre image a été bien insérée"
                });
            }
            else {
                resolve({ error: err, data: "" });
            }
        });
    }
}


module.exports = new ImagesDao();
