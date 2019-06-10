let url = require('url');

function dynamicRenderVehicule(req, res) {
    const urlFrom = url.parse(req.originalUrl).pathname;

    console.log(urlFrom)

    const vehiculeRoutes = [
        "/vehicules",
        "/vehicules/ajout",
        "/vehicules/modifier",
        "/vehicules/supprimer",
        "/vehicules/list",
    ];

    const views = [
        "vehicules/index",
        "vehicules/ajout",
        "vehicules/modifier",
        "vehicules/supprimer",
        "vehicules/list-vehicules",
    ];
    
    let indx = vehiculeRoutes.indexOf(urlFrom);

    res.render(views[indx]);
    return;
}

function dynamicRenderUser(req, res) {
    const urlFrom = url.parse(req.originalUrl).pathname;
    console.log(urlFrom)
}


module.exports = { dynamicRenderVehicule };
