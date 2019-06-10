const vehiculeDao = require("../dao/vehicule.dao");
const Vehicule = require("../models/Vehicule.model");
const { getActionName } = require("../service/url.service");


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
                etatQuery = (etatQuery + "").trim();

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

    getVehicule(req, res) {
        let numSerie = req.query.v;

        vehiculeDao.getVehiculeByNum(numSerie.trim(), (resolve) => {

            res.render(`vehicules/${getActionName(req)}`, {
                data: resolve.data,
                msg: resolve.error
            });
            return;
        });

    }


    update(req, res) {
        let { numSerie, model, etat } = req.body;
        let vehicule = new Vehicule(numSerie.trim(), model.trim());

        vehiculeDao.update(vehicule, etat, (resolve) => {
            res.render("vehicules/modifier", { msg: resolve.data || resolve.error });
            return;
        });
    }


    supprimer(req, res) {
        let { numSerie, model } = req.body;
        let vehicule = new Vehicule(numSerie.trim(), model.trim());

        vehiculeDao.delete(vehicule, (resolve) => {
            res.render("vehicules/supprimer", { msg: resolve.data || resolve.error });
            return;
        });
    }
}

module.exports = new VehiculeController();
