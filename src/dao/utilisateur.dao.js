const db = require('../database/DbConnection');
const { utilisateurTable } = require("../database/migration");

class UserDao {

    addUser(user, resolve) {

        const sql = `insert into ${utilisateurTable.tabelName} (
            ${utilisateurTable.nomComplet}, 
            ${utilisateurTable.email}, 
            ${utilisateurTable.password}, 
            ${utilisateurTable.division}, 
            ${utilisateurTable.role}
        ) 
        values('${user.nomComplet}', 
        '${user.email}', '${user.password}', '${user.division}' ,'${user.role}')`;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "utilisateur existe deja!" : "",
                data: err ? "" : "un utilisateur a été bien inséré"
            });
        });
    }

    /** Update profile user */
    updateUserPassword(email, password, resolve) {
        const sql = `update ${utilisateurTable.tabelName} 
        set ${utilisateurTable.password} = '${password}' 
        where ${utilisateurTable.email} = '${email}' `;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "erreur de modification!" : "",
                data: err ? "" : "votre mot de passe a été modifié"
            });
        });
    }


    /** modification d'un utilisateur par l'admin */
    updateUser(user, resolve) {

        const { nomComplet, email, password, division, role } = user;

        const sql = `update ${utilisateurTable.tabelName} 
                    set 
                        ${utilisateurTable.nomComplet} = '${nomComplet}',
                        ${utilisateurTable.password} = '${password}',
                        ${utilisateurTable.division} = '${division}' ,
                        ${utilisateurTable.role} = '${role}' 
                    where ${utilisateurTable.email} = '${email}' 
        `;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "erreur de modification!" : "",
                data: err ? "" : "un utilisateur a été modifié"
            });
        });
    }




    /** Delete user by email */
    deleteUser(email, resolve) {
        const sql = `delete from ${utilisateurTable.tabelName} 
        where ${utilisateurTable.email} = '${email}'`;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "erreur de suppression!" : "",
                data: err ? "" : "un utilisateur a été bien supprimé"
            });
        });
    }



    /** Get user by email and password */
    getOneByEmail(email, password, resolve) {
        const sql = `select * from ${utilisateurTable.tabelName}         
        where ${utilisateurTable.email} = '${email}' 
        and ${utilisateurTable.password} = '${password}'`;

        db.query(sql, (err, rows) => {
            resolve({ error: err, data: rows });
        });
    }




    /** Get user by email and password */
    isExist(email, resolve) {
        const sql = `select * from ${utilisateurTable.tabelName} 
        where ${utilisateurTable.email} = '${email}' `;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "erreur! l'utilisateur n'existe pas" : "",
                data: err ? "" : rows[0]
            });
        });
    }




    /** Get all users from database */
    getUsers(resolve) {
        const sql = `select * from ${utilisateurTable.tabelName}`;

        db.query(sql, (err, rows) => {
            resolve({ error: err, data: rows });
        });
    }

}


module.exports = new UserDao();