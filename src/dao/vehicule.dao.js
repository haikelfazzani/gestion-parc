const db = require('../database/DbConnection');

const { vehiculeTable } = require("../database/migration");
const { tableName, vIdField, numSerieField, marqueField, etatField } = vehiculeTable;


class VehiculeDao {

    addVehicule(vehicule, resolve) {

        const sql = `insert into ${tableName} (${numSerieField}, ${marqueField}) 
        values('${vehicule.numSerie}', '${vehicule.marque}')`;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "véhicule existe deja" : "",
                data: err ? "" : "une véhicule a été bien insérée"
            });
        });
    }

    /** Get all users from database */
    getVehicules(resolve) {
        const sql = `select * from ${tableName}`;

        db.query(sql, (err, rows) => {
            resolve({ error: err ? err : "", data: err ? "" : rows });
        });
    }

    getVehiculeByNum(numSerie, resolve) {
        const sql = `select * from ${tableName} 
        where ${numSerieField} = '${numSerie}'`;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "aucune vehicule trouvée!" : "",
                data: err ? "" : rows[0]
            });
        });
    }

    // lister les véhicules par etat
    getVehiculeByEtat(etat, resolve) {

        const sql = `select * from ${vehiculeTable.tableName} 
        where ${vehiculeTable.etatField} = '${etat}'  `;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "aucun vehicule trouvée!" : "",
                data: err ? "" : rows
            });
        });
    }


    deleteVehicule(vehicule, resolve) {
        const { numSerie, marque } = vehicule;

        const sql = `delete from ${vehiculeTable.tableName} 
        where ${numSerieField} = '${numSerie}'  `;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "erreur de suppression!" : "",
                data: err ? "" : "une vehicule a été bien supprimée"
            });
        });
    }

    updateVehicule(idVehicule, vehicule, etat, resolve) {

        const { numSerie, marque } = vehicule;


        const sql = `update ${tableName} 
        set ${numSerieField} = '${numSerie}',
            ${marqueField} = '${marque}' , 
            ${etatField} = '${etat}'
        where ${vIdField} = '${idVehicule}'`;

        db.query(sql, (err, rows) => {

            resolve({
                error: err ? "erreur de modification!" : "",
                data: err ? "" : "une vehicule a été bien modifiée"
            });
        });
    }
}

module.exports = new VehiculeDao();
