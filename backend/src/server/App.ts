import morgan from 'morgan';
import cors from 'cors';
import express, { Application } from 'express';
import router from '../routes';
import Middleware from '../middlewares/Middlewares';
import { DBLisener } from '../config/DBConnection';

class App {
    private app: Application;
    private port: string | number;

    public constructor() {
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.databaseConnection();
        this.middlewares();
        this.routes();
        this.customMiddlewares();
    }

    private databaseConnection(): void {
        DBLisener();
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    private customMiddlewares(): void {
        const middleware = new Middleware();
        this.app.use(middleware.notFound);
        this.app.use(middleware.serverInternaError);
    }

    private routes(): void {
        this.app.use('/api/v1', router);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server listen on PORT ${this.port}`);
        });
    }
}

export default App;
