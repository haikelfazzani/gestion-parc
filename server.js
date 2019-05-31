let app = require("./src/app");
let PORT = process.env.PORT || 3000;

var http = require("http");
setInterval(function () {
  http.get("https://gestion-park.herokuapp.com/auth/login");
}, 300000);

app.listen(PORT, (err) => {
  console.log("Server listening on port " + PORT);
  //console.log(err)
});