const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookeParser = require("cookie-parser");
const expressSession = require("express-session");

const Role = require('./models/Role.enum');
const Division = require("./models/Division.enum");
const Etat = require("./models/Etat.enum");
let { formatDate } = require("./service/date.service");

const app = express();


// sessions
app.use(expressSession({
  secret: '343ji43j4n3jn4jk3n',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
  }
}));

// set globall variables
app.use((req, res, next) => {

  if (req.session && req.session.userInfo) {
    const { userInfo } = req.session;
    res.locals.userInfo = userInfo;
    res.locals.role = Role;
    res.locals.division = Division;
    res.locals.Etat = Etat;
    res.locals.formatDate = formatDate;
  }
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));

// data parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookeParser());

// Routers
app.use("/auth", require("./routes/auth.routes"));

app.use("/", require("./routes/main.routes"));
app.use("/profile", require("./routes/profile.routes"));
app.use("/utilisateur", require("./routes/utilisateur.routes"));
app.use("/vehicules", require("./routes/vehicules.routes"));
app.use("/reservations", require("./routes/reservations.routes"));

// route
app.use("*", (req, res) => {
  res.redirect("/");
});


module.exports = app;
