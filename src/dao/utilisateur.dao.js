const db = require('../database/DbConnection');

class UtilisateurDao {

    constructor() {
        this.tabelName = "utilisateur";
        // les champs
        this.id = "id";
        this.nomComplet = "nom_complet";
        this.email = "email";
        this.password = "password";
        this.role = "role";
    }

    insert(user, resolve) {

        const sql = `insert into ${this.tabelName} (
            ${this.nomComplet}, ${this.email}, ${this.password}, ${this.role}
        ) 
        values('${user.nomComplet}', '${user.email}', '${user.password}', '${user.role}')`;

        db.query(sql, (err, rows) => {
            resolve({
                error: "erreur d'insertion!",
                data: "un utilisateur a été bien inséré"
            });
        });

        //db.destroy();
    }

    update() { }

    delete() { }

    getOneByEmail(email, resolve) {
        const sql = `select * from ${this.tabelName} where ${this.email} = '${email}' `;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
        });

        //db.destroy();
    }

    getAll(resolve) {
        const sql = `select * from ${this.tabelName}`;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
        });

        //db.destroy();
    }

}

const utilisateurDao = new UtilisateurDao();
module.exports = utilisateurDao;
