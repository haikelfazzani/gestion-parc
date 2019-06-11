const vehiculeDao = require("../dao/vehicule.dao");
const Vehicule = require("../models/Vehicule.model");
const { getActionName } = require("../service/url.service");


class VehiculeController {

    async ajouter(req, res) {
        const { numSerie, model } = req.body;
        const vehicule = new Vehicule((numSerie + "").trim(), (model + "").trim());

        await vehiculeDao.insert(vehicule, async (resolve) => {
            await res.render("vehicules/ajout",
                { msg: resolve.data || resolve.error }
            );
        });
    }

    async update(req, res) {
        const { numSerie, model, etat } = req.body;
        const vehicule = new Vehicule(numSerie.trim(), model.trim());

        await vehiculeDao.update(vehicule, etat, async (resolve) => {
            await res.render("vehicules/modifier",
                { msg: resolve.data || resolve.error }
            );
        });
    }


    async supprimer(req, res) {
        let { numSerie, model } = req.body;
        let vehicule = new Vehicule(numSerie.trim(), model.trim());

        await vehiculeDao.delete(vehicule, async (resolve) => {
            await res.render("vehicules/supprimer",
                { msg: resolve.data || resolve.error }
            );
        });
    }


    async getVehicule(req, res) {

        try {

            let numSerie = req.query.v;
            numSerie = (numSerie + "").trim();

            await vehiculeDao.getVehiculeByNum(numSerie, async (resolve) => {

                await res.render(`vehicules/${getActionName(req)}`,
                    { data: resolve.data, msg: resolve.error }
                );
            });
        }
        catch (error) {
            await res.render(`error`, { exceptionMsg: error });
        }

    }


    async getAll(req, res) {
        await vehiculeDao.getAll(async (resolve) => {

            const vehicules = resolve.data;
            const { etatQuery } = req.query;

            if (etatQuery) {
                etatQuery = (etatQuery + "").trim();

                await res.render("vehicules/list-vehicules",
                    { msg: resolve.error, data: vehicules, etatQuery }
                );
            }
            else {
                await res.render("vehicules/list-vehicules",
                    { msg: resolve.error, data: vehicules }
                );
            }
        });
    }

}

module.exports = new VehiculeController();
