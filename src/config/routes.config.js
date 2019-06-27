const routesStruct = {
    // home page
    index: { acceuil: "/" },
    // auth
    auth: { login: "/auth/login", logout: "/auth/logout" },
    // users
    users: {
        add: "/users/add",
        list: "/users/list",
        profile: "/profile"
    },
    // vehicules
    vehicules: {
        add: "/vehicules/add",
        list: "/vehicules/list",
    },
    // reservations
    reservations: {
        list: "/reservations/list-demands",
        history: "/reservations/history",
        listvehicule: "/reservations/user/list-vehicules",
        listreserved: "/reservations/user/list-reserved"
    }
}

module.exports = routesStruct;
