const mode = "dev";

function checkURL(basePath, key) {
    let pathURL = window.location.href.split("/");
    return pathURL.includes(basePath) && pathURL.some(i => i.startsWith(key))
}