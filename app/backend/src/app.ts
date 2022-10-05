import * as express from 'express';
import LoginController from './controllers/loginController';
import MatchController from './controllers/matchController';
import TeamController from './controllers/teamController';
import validateLogin from './middlewares/validateLogin';
import validateToken from './middlewares/validateToken';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    const loginController = new LoginController();
    const teamController = new TeamController();
    const matchController = new MatchController();

    this.app.post('/login', validateLogin, loginController.login);
    this.app.get('/login/validate', validateToken, loginController.validate);

    this.app.get('/teams', teamController.findAll);
    this.app.get('/teams/:id', teamController.findByPk);

    this.app.get('/matches', matchController.getAll);
    this.app.post('/matches', validateToken, matchController.create);

    this.app.patch('/matches/:id/finish', matchController.update);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App(); //
