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

}

const vehiculeDao = new VehiculeDao();
module.exports = vehiculeDao;
