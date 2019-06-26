const mode = "dev";

var baseURL = window.location.href.split("/");

function checkURL(basePath, key) {
    return baseURL.includes(basePath) && baseURL.some(i => i.startsWith(key))
}