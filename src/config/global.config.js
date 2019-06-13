const staticFiles = require("../config/static.config"),
  routesStruct = require("../config/routes.config"),
  Role = require('../models/Role.enum'),
  Division = require("../models/Division.enum"),
  Etat = require("../models/Etat.enum"),
  { formatDate } = require("../service/date.service");

function setGlobalVar(req, res) {
    if (req.session && req.session.userInfo) {
        const { userInfo } = req.session;
        res.locals.userInfo = userInfo;

        res.locals.routesStruct = routesStruct;
        res.locals.staticFiles = staticFiles;

        res.locals.avatar = req.session.avatar;
        
        res.locals.role = Role;
        res.locals.division = Division;
        res.locals.Etat = Etat;
        res.locals.formatDate = formatDate;
    }
}

module.exports = setGlobalVar;
