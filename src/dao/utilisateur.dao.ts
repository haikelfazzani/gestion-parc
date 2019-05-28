import dbConn from '../database/DbConnection';
import { IUtilisateur } from 'models/IUtilisateur.model';
import { IResolve } from 'models/IResolve.model';

class UtilisateurDao {

    tabelName: string = "utilisateur";
    // les champs
    id: number;
    nomComplet: string = "nom_complet";
    email: string = "email";
    password: string = "password";
    role: string = "role";

    async insert(user: IUtilisateur, resolve: any) {
        
        const sql = `insert into ${this.tabelName} (
            ${this.nomComplet}, ${this.email}, ${this.password}, ${this.role}
        ) 
        values('${user.nomComplet}', '${user.email}', '${user.password}', '${user.role}')`;

        await dbConn.query(sql, (err, rows) => {
            resolve({ 
                error: "erreur d'insertion!", 
                data : "un utilisateur a été bien inséré" 
            });
        });
    }

    update() { }

    delete() { }

    getOneByEmail(email: string, resolve: any) {
        const sql = `select * from ${this.tabelName} where ${this.email} = '${email}' `;

        dbConn.query(sql, (err, rows) => {
            resolve({ 
                error: err, 
                data : rows 
            });
        });
    }

    async getAll(resolve:any) { 
        const sql = `select * from ${this.tabelName}`;

        await dbConn.query(sql, (err, rows) => {
            resolve({ 
                error: err, 
                data : rows 
            });
        });
    }

}

const utilisateurDao = new UtilisateurDao();
export default utilisateurDao;
