import express from 'express';
import * as path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
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
    this.setupSwagger();
  }

  public middleware(): void {
    this.express.use(express.json());
  }

  public async database(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
    }
  }

  public routes(): void {
    this.express.use(seedRoutes);
    this.express.use(charactersRoutes);
    this.express.use(comicsRoutes);
    this.express.use(creatorsRoutes);
    this.express.use(seriesRoutes);
  }

  public errorHandling(): void {
    this.express.use(errorMiddleware);
  }

  public setupSwagger(): void {
    const options = {
      definition: {
        openapi: '3.1.0',
        info: {
          title: 'Avaliação Desafio Profissional V - Marvel API',
          version: '1.0.0',
          description: 'API RESTful para consulta de dados da Marvel Comics.',
        },
      },
      apis: [path.resolve(__dirname, './routes/*.route.ts')],
    };

    const swaggerSpec = swaggerJSDoc(options);
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}


export default new App().express;