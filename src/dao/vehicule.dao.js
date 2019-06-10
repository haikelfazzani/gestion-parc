const db = require('../database/DbConnection');

class VehiculeDao {

    constructor() {
        this.tabelName = "vehicule";
        // les champs
        this.id = "id_vehicule";
        this.numSerie = "num_serie";
        this.model = "model";
        this.etat = "etat";
    }

    insert(vehicule, resolve) {

        const sql = `insert into ${this.tabelName} (${this.numSerie}, ${this.model}) 
        values('${vehicule.numSerie}', '${vehicule.model}')`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "une véhicule a été bien inséré"
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

    /** Get all users from database */
    getAll(resolve) {
        const sql = `select * from ${this.tabelName}`;

        db.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
        });
    }

    getVehiculeByNum(numSerie, resolve) {
        const sql = `select * from ${this.tabelName} where ${this.numSerie} = '${numSerie}'`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: rows[0]
                });
            }
            else {
                resolve({
                    error: "aucun vehicule trouvée!",
                    data: ""
                });
            }
        });
    }


    delete(vehicule, resolve) {
        const { numSerie, model } = vehicule;

        const sql = `delete from ${this.tabelName} where ${this.numSerie} = '${numSerie}'`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "une vehicule a été bien supprimée"
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

    update(vehicule, etat, resolve) {

        const { numSerie, model } = vehicule;

        const sql = `update ${this.tabelName} 
        set ${this.model} = '${model}' , ${this.etat} = '${etat}'
        where ${this.numSerie} = '${numSerie}'`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: "une vehicule a été bien modifiée"
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
}

module.exports = new VehiculeDao();
