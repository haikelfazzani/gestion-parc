const vehiculeDao = require("../dao/vehicule.dao");
const Vehicule = require("../models/Vehicule.model");
const { getActionName } = require("../service/url.service");


class VehiculeController {

    async addVehicule(req, res) {
        const { numSerie, model } = req.body;
        const vehicule = new Vehicule((numSerie + "").trim(), (model + "").trim());

        await vehiculeDao.addVehicule(vehicule, async (resolve) => {
            await res.render("vehicules/add-vehicule",
                { msg: resolve.data || resolve.error }
            );
        });
    }

    async updateVehicule(req, res) {
        const { numSerie, model, etat } = req.body;
        const vehicule = new Vehicule(numSerie.trim(), model.trim());

        await vehiculeDao.updateVehicule(vehicule, etat, async (resolve) => {
            await res.render("vehicules/update-vehicule",
                { msg: resolve.data || resolve.error }
            );
        });
    }


    async deleteVehicule(req, res) {
        let { numSerie, model } = req.body;
        let vehicule = new Vehicule(numSerie.trim(), model.trim());

        await vehiculeDao.deleteVehicule(vehicule, async (resolve) => {
            await res.render("vehicules/delete-vehicule",
                { msg: resolve.data || resolve.error }
            );
        });
    }


    async getVehicule(req, res) {

        try {

            let numSerie = req.query.v;
            numSerie = (numSerie + "").trim();

            await vehiculeDao.getVehiculeByNum(numSerie, async (resolve) => {

                await res.render(`vehicules/${getActionName(req)}-vehicule`,
                    { data: resolve.data, msg: resolve.error }
                );
            });
        }
        catch (error) {
            await res.render(`error`, { exceptionMsg: error });
        }

    }


    async getVehicules(req, res) {
        await vehiculeDao.getVehicules(async (resolve) => {

            let vehicules = resolve.data;
            let { etatQuery } = req.query;

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
