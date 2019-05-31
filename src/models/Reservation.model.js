class Reservation {

    constructor(date_depart, date_retour, boss_order, desc_mission, user_id, vehicule_id) {
        this.dateDepart = date_depart;
        this.dateRetour = date_retour;
        this.bossOrder = boss_order;
        this.descMission = desc_mission;
        this.userId = user_id;
        this.vehiculeId = vehicule_id;
    }

}

module.exports = Reservation;
