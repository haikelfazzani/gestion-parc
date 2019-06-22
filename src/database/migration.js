const vehiculeTable = {
    tableName: "vehicules",
    // les champs
    vIdField: "id_vehicule",
    numSerieField: "num_serie",
    marqueField: "marque",
    etatField: "etat"
}

const imgTable = {
    tableName: "images",
    // fields
    id: "images_id",
    avatar: "avatar",
    userId: "utilisateur_id"
}

const notifTable = {
    tableName: "notifications",
    // fields
    idNotif: "id_notif",
    message: "message",
    etatNotif: "etat_notif",
    dateNotif: "date_notif",
    userId: "utilisateur_id"
}


const utilisateurTable = {
    tabelName: "utilisateurs",
    // fields
    id: "id_utilisateur",
    nomComplet: "nom_complet",
    email: "email",
    password: "password",
    division: "division",
    role: "role"
}


const reservTable = {
    tableName: "reservations",
    // fields
    dateDepart: "date_depart",
    dateRetour: "date_retour",
    bossOrder: "boss_order",
    descMission: "desc_mission",
    userIdRes: "utilisateur_id",
    vehiculeIdRes: "vehicule_id"
}

module.exports = {
    utilisateurTable, vehiculeTable, reservTable,
    imgTable, notifTable
};
