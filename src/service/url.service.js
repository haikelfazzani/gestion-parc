let url = require('url');

function checkURL(req) {
    const urlFrom = url.parse(req.originalUrl).pathname;
    return urlFrom.split("?")[0];
}

function getActionName(req) {
    const urlFrom = checkURL(req);
    return urlFrom.split("/")[2];
}

module.exports = { checkURL, getActionName };