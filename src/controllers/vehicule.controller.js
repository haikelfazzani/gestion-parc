const vehiculeDao = require("../dao/vehicule.dao");
const Vehicule = require("../models/Vehicule.model");
const { getActionName } = require("../service/url.service");


class VehiculeController {

    ajouter(req, res) {
        const { numSerie, model } = req.body;
        const vehicule = new Vehicule((numSerie+"").trim(), (model+"").trim());

        vehiculeDao.insert(vehicule, (resolve) => {
            res.render("vehicules/ajout", { msg: resolve.data || resolve.error });
            return;
        });
    }

    update(req, res) {
        const { numSerie, model, etat } = req.body;
        const vehicule = new Vehicule(numSerie.trim(), model.trim());

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


    getVehicule(req, res) {

        try {

            let numSerie = req.query.v;
            numSerie = (numSerie + "").trim();

            vehiculeDao.getVehiculeByNum(numSerie, (resolve) => {

                res.render(`vehicules/${getActionName(req)}`, {
                    data: resolve.data,
                    msg: resolve.error
                });
                return;
            });
        } catch (error) {
            res.render(`error`, { exceptionMsg: error });
            return;
        }

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

}

module.exports = new VehiculeController();
