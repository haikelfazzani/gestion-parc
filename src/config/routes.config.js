const routesStruct = {
    // home page
    index: { acceuil: "/" },
    // auth
    auth: { login: "/auth/login", logout: "/auth/logout" },
    // users
    users: {
        index: "/users",
        add: "/users/add",
        list: "/users/list",
        profile: "/profile"
    },
    // vehicules
    vehicules: {
        index: "/vehicules",
        add: "/vehicules/add",
        list: "/vehicules/list",
    },
    // reservations
    reservations: {
        index: "/reservations",
        list: "/reservations/list-demands",
        history: "/reservations/history",
        listvehicule: "/reservations/user/list-vehicules",
        listreserved: "/reservations/user/list-reserved"
    }
}

module.exports = routesStruct;
