const db = require('../database/DbConnection');

class UtilisateurDao {

    constructor() {
        this.tabelName = "utilisateur";
        // fields
        this.id = "id";
        this.nomComplet = "nom_complet";
        this.email = "email";
        this.password = "password";
        this.division = "division";
        this.role = "role";
        this.avatar = "avatar";
    }

    insert(user, resolve) {

        const sql = `insert into ${this.tabelName} (
            ${this.nomComplet}, ${this.email}, ${this.password}, ${this.division}, ${this.role}
        ) 
        values('${user.nomComplet}', '${user.email}', '${user.password}', '${user.division}' ,
        '${user.role}')`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "un utilisateur a été bien inséré"
                });
            }
            else {
                resolve({
                    error: "erreur d'insertion!",
                    data: ""
                });
            }
        });
    }

    /** Update profile user */
    update(email, password, resolve) {
        const sql = `update ${this.tabelName} 
        set ${this.password} = '${password}' 
        where ${this.email} = '${email}' `;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "votre mot de passe a été modifié"
                });
            }
            else {
                resolve({
                    error: "erreur de modification!",
                    data: ""
                });
            }
        });
    }


    /** modification d'un utilisateur par l'admin */
    modifier(user, resolve) {

        const { nomComplet, email, password, division, role } = user;

        const sql = `update ${this.tabelName} 
                    set 
                        ${this.nomComplet} = '${nomComplet}',
                        ${this.password} = '${password}',
                        ${this.division} = '${division}' ,
                        ${this.role} = '${role}' 
                    where ${this.email} = '${email}' 
        `;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "un utilisateur a été modifié"
                });
            }
            else {
                resolve({
                    error: "erreur de modification!",
                    data: ""
                });
            }
        });
    }




    /** Delete user by email */
    delete(email, resolve) {
        const sql = `delete from ${this.tabelName} where ${this.email} = '${email}'`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "un utilisateur a été bien supprimé"
                });
            }
            else {
                resolve({
                    error: "erreur de suppression!",
                    data: ""
                });
            }

        });
    }



    /** Get user by email and password */
    getOneByEmail(email, password, resolve) {
        const sql = `select ${this.id},${this.nomComplet}, 
        ${this.email}, ${this.password}, ${this.division}, ${this.role} 
        from ${this.tabelName}         
        where ${this.email} = '${email}' and 
        ${this.password} = '${password}'`;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
        });
    }




    /** Get user by email and password */
    isExist(email, resolve) {
        const sql = `select ${this.id},${this.nomComplet}, 
        ${this.email}, ${this.password}, ${this.division}, ${this.role} from ${this.tabelName} 
        where ${this.email} = '${email}' `;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: rows[0]
                });
            }
            else {
                resolve({
                    error: "erreur! l'utilisateur n'existe pas",
                    data: ""
                });
            }
        });
    }




    /** Get all users from database */
    getAll(resolve) {
        const sql = `select ${this.id},${this.nomComplet}, 
        ${this.email}, ${this.password}, ${this.division}, ${this.role} 
        from ${this.tabelName}`;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
        });
    }
    
}


module.exports = new UtilisateurDao();
