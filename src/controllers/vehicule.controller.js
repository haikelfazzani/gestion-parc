
const vehiculeDao = require("../dao/vehicule.dao");
const Vehicule = require("../models/Vehicule.model");

class VehiculeController {

    ajouter(req, res) {
        let { numSerie, model } = req.body;
        let vehicule = new Vehicule(numSerie.trim(), model.trim());

        vehiculeDao.insert(vehicule, (resolve) => {
            res.render("vehicules/ajout", { msg: resolve.data || resolve.error });
            return;
        });
    }

    getAll(req, res) {
        vehiculeDao.getAll((resolve) => {
            let vehicules = resolve.data;
            let { etatQuery } = req.query;
            if (etatQuery) {
                etatQuery = (etatQuery+"").trim();

                res.render("vehicules/list-vehicules",
                    { msg: resolve.error, data: vehicules, etatQuery }
                );
                return;
            }
            else {
                res.render("vehicules/list-vehicules", { msg: resolve.error, data: vehicules });
                return;
            }
        });
    }


}

module.exports = new VehiculeController();
