const express = require("express"),
  app = express(),
  cors = require('cors'),  
  corsOptions = require("./middlewares/cors.middleware");
  helmet = require('helmet'),
  bodyParser = require("body-parser"),
  path = require("path"),
  cookeParser = require("cookie-parser"),
  expressSession = require("express-session"),
  compression = require('compression');

const setGlobalVar = require("./config/global.config");
const checkVehiculeDate = require("./service/vehicule.trigger");

app.use(cors(corsOptions))

app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());


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
  await setGlobalVar(req, res);
  await next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));

// data parse
//var csrfProtection = csrf({ cookie: true });
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookeParser());

// Routers
app.use("/", require("./routes/main.routes"));
app.use("/auth", require("./routes/auth.routes"));

// trigger to compare date back with current date
app.use(async (req, res, next) => {
  await checkVehiculeDate(req , res);
  await next();
});

// other routes
app.use("/profile", require("./routes/profile.routes"));
app.use("/users", require("./routes/utilisateur.routes"));
app.use("/vehicules", require("./routes/vehicules.routes"));
app.use("/reservations", require("./routes/reservations.routes"));
app.use("/notifications", require("./routes/notifications.routes"));


app.use("/error", async (req, res) => {
  await res.render("error")
})


// route not found
app.use("*", async (req, res) => {   
  await res.redirect("/"); 
});




module.exports = app;
