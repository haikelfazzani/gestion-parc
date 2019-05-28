const db = require('../database/DbConnection');

class VehiculeDao {

    constructor() {
        this.tabelName = "vehicule";
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

        //db.end();
    }

    /** Update user */
    update(email, resolve) { }


    /** Delete user by email */
    delete(email, resolve) { 
        const sql = `delete from ${this.tabelName} where ${this.email} = '${email}'`;

        db.query(sql, (err, rows) => {
            resolve({
                error: "erreur de suppression",
                data: "un utilisateur a été supprimé"
            });
            if(err || (rows && rows.length > 0)) db.end();
        });
    }



    /** Get user by email and password */
    getOneByEmail(email, password, resolve) {
        const sql = `select * from ${this.tabelName} 
        where ${this.email} = '${email}' and 
        ${this.password} = '${password}'`;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
            if(err || (rows && rows.length > 0)) db.end();
        });        
    }

    /** Get all users from database */
    getAll(resolve) {
        const sql = `select * from ${this.tabelName}`;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });

            if(err || (rows && rows.length > 0)) db.end();
        });
    }

}

const vehiculeDao = new VehiculeDao();
module.exports = vehiculeDao;
