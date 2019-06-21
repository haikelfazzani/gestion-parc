const db = require('../database/DbConnection');

class VehiculeDao {

    constructor() {
        this.tabelName = "vehicules";
        // les champs
        this.id = "id_vehicule";
        this.numSerie = "num_serie";
        this.marque = "marque";
        this.etat = "etat";
    }

    addVehicule(vehicule, resolve) {

        const sql = `insert into ${this.tabelName} (${this.numSerie}, ${this.marque}) 
        values('${vehicule.numSerie}', '${vehicule.marque}')`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({ error: "", data: "une véhicule a été bien insérée" });
            }
            else {
                resolve({ error: "véhicule existe deja", data: "" });
            }
        });
    }

    /** Get all users from database */
    getVehicules(resolve) {
        const sql = `select * from ${this.tabelName}`;

        db.query(sql, (err, rows) => {
            resolve({ error: err, data: rows });
        });
    }

    getVehiculeByNum(numSerie, resolve) {
        const sql = `select * from ${this.tabelName} where ${this.numSerie} = '${numSerie}'`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({ error: "", data: rows[0] });
            }
            else {
                resolve({ error: "aucune vehicule trouvée!", data: "" });
            }
        });
    }

    // lister les véhicules par etat
    getVehiculeByEtat(etat, resolve) {

        const sql = `select * from ${this.tabelName} where ${this.etat} = '${etat}'`;

        db.query(sql, (err, rows) => {
            if (!err) {
                resolve({
                    error: "",
                    data: rows
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


    deleteVehicule(vehicule, resolve) {
        const { numSerie, marque } = vehicule;

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

    updateVehicule(vehicule, etat, resolve) {

        const { numSerie, marque } = vehicule;

        const sql = `update ${this.tabelName} 
        set ${this.marque} = '${marque}' , ${this.etat} = '${etat}'
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
