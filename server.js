let app = require("./src/app");
let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});