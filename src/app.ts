import cors from './middlewares/cors.middleware';
import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as cookeParser from "cookie-parser";
import * as expressSession from "express-session";

// Routes
import { mainRoutes } from './routes/main.routes';
import { utilisateurRoute } from './routes/utilisateur.routes';
import { authRoutes } from './routes/auth.routes';
import Role from './models/Role.enum';

class App {

  public app: express.Application;

  constructor() {
    this.app = express();

    // cors setup
    this.app.use(async (req, res, next) => {
      await this.setHeaderOrigin(req);
      next();
    });

    // sessions
    this.app.use(expressSession({
      secret: '343ji43j4n3jn4jk3n',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 24 * 1000,
      }
    }));


    this.app.use((req: any, res, next: express.NextFunction) => {
      
      res.locals.role = Role;

      if (req.session && req.session.userInfo) {        
        const { userInfo } = req.session;
        res.locals.userInfo = userInfo;
      }
      next();
    });


    // view engine setup
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');

    // set path for static assets
    this.app.use(express.static(path.join(__dirname, 'public')));


    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookeParser());

    // Routers
    this.app.use("/auth", cors, authRoutes);

    this.app.use("/", cors, mainRoutes);
    this.app.use("/utilisateur", cors, utilisateurRoute);
  }

  setHeaderOrigin(req: express.Request): void {
    req.headers.origin = req.headers.origin || req.headers.host;
  }


}

export default new App().app;
