import * as express from 'express';
import routes from './routes';
import * as cors from 'cors';
import ErrorMiddleware from './middlewares/error';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.config();
    this.route();
    // ...
  }

  // route === rotas
  private route():void {
    this.app.use(routes);
    this.app.use(ErrorMiddleware.error1);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    // ...
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
