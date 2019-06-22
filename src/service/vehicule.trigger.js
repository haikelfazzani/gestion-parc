const ReservationDao = require("../dao/reservation.dao");
const Etat = require("../models/Etat.enum");

/** Verifier le date retour vehicule et supprimer la reservation */
function checkVehiculeDate(req, res) {

  let date = (new Date().toISOString()).slice(0, 10);


  ReservationDao.history((resolve) => {
    let historyResv = resolve.data;

    if (historyResv && historyResv.length > 0) {
      let result = historyResv.filter(h =>
        dateToNumber(h.date_retour) + 1 <= dateToNumber(date)
      );

      result.forEach(h => {
        if (dateToNumber(h.date_retour) + 1 <= dateToNumber(date)) {

          ReservationDao
            .checkVehiculeDateBack(h.utilisateur_id, h.vehicule_id, Etat.nonReserved,
              async (resolve) => {
                //await console.log(resolve)
              });
        }
      });

    }

  });
}


function dateToNumber(input) { // 2019-06-13 => 2038
  return input.split("-").reduce((a, c) => a + +c, 0);
}

module.exports = checkVehiculeDate;
