import express from 'express';
import { charactersRoutes } from './routes/characters.route';
import { comicsRoutes } from './routes/comics.route';
import { creatorsRoutes } from './routes/creators.route';
import { seedRoutes } from './routes/seed.route';
import { seriesRoutes } from './routes/series.route';
import { AppDataSource } from './src/shared/database/database.config';
import { errorMiddleware } from './src/shared/middlewares/error.middleware';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
    this.errorHandling();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private async database() {
    AppDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization:", err);
      });
  }

  private routes(): void {
    this.express.use(seedRoutes);
    this.express.use(charactersRoutes);
    this.express.use(comicsRoutes);
    this.express.use(creatorsRoutes);
    this.express.use(seriesRoutes);
  }

  private errorHandling(): void {
    this.express.use(errorMiddleware);
  }
}

export default new App().express;