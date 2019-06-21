function getCurrentUserId(req) {
    const { id_utilisateur } = req.session.userInfo;
    console.log(id_utilisateur)
    return id_utilisateur;
}

module.exports = { getCurrentUserId };
