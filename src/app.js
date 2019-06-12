const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  path = require("path"),
  cookeParser = require("cookie-parser"),
  expressSession = require("express-session"),
  compression = require('compression');

const staticFiles = require("./config/static.config"),
  routesStruct = require("./config/routes.config"),
  Role = require('./models/Role.enum'),
  Division = require("./models/Division.enum"),
  Etat = require("./models/Etat.enum"),
  { formatDate } = require("./service/date.service");


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
app.use(async (req, res, next) => {

  if (req.session && req.session.userInfo) {
    const { userInfo } = req.session;

    res.locals.routesStruct = routesStruct;
    res.locals.staticFiles = staticFiles;

    res.locals.avatar = req.session.avatar;

    res.locals.userInfo = userInfo;
    res.locals.role = Role;
    res.locals.division = Division;
    res.locals.Etat = Etat;
    res.locals.formatDate = formatDate;
  }
  await next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));

// data parse
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookeParser());


// Routers
app.use("/", require("./routes/main.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.use("/profile", require("./routes/profile.routes"));
app.use("/users", require("./routes/user.routes"));
app.use("/vehicules", require("./routes/vehicules.routes"));
app.use("/reservations", require("./routes/reservations.routes"));

// route
app.use("*", async (req, res) => { await res.redirect("/"); });


module.exports = app;
