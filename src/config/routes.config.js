const routesStruct = {
    // home page
    index: { acceuil: "/" },
    // auth
    auth: { login: "/auth/login", logout: "/auth/logout" },
    // utilisateurs
    utilisateurs: {
        index: "/utilisateur",
        ajout: "/utilisateur/ajout",
        lister: "/utilisateur/list",
        profile: "/profile"
    },
    // vehicules
    vehicules: {
        index: "/vehicules",
        ajout: "/vehicules/ajout",
        lister: "/vehicules/list",
    },
    // reservations
    reservations: {
        index: "/reservations",
        lister: "/reservations/list",
        listervehicule: "/reservations/user/list-vehicules",
        listerreserved: "/reservations/user/list-reserved"
    }
}

module.exports = routesStruct;
