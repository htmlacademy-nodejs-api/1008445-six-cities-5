import cors from 'cors';
import express, { Express } from 'express';
import { ILogger } from '../shared/libs/logger/index.js';
import { IConfig, TRestSchema } from '../shared/libs/config/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/index.js';
import { IDatabaseClient } from '../shared/libs/database-client/index.js';
import { getFullServerPath, getMongoURI } from '../shared/helpers/index.js';
import { IController, IExceptionFilter, ParseTokenMiddleware } from '../shared/libs/rest/index.js';
import { APP_LOGS, STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from './rest.constant.js';

@injectable()
export class RestApplication {
  private server: Express = express();
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
    @inject(Component.ReviewController) private readonly reviewController: IController,
    @inject(Component.UserController) private readonly userController: IController,
    @inject(Component.OfferController) private readonly offerController: IController,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: IExceptionFilter,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: IExceptionFilter,
    @inject(Component.HttpExceptionFilter) private readonly httpExceptionFilter: IExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: IExceptionFilter,
  ) {}

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/reviews', this.reviewController.router);
    this.server.use('/user', this.userController.router);
    this.server.use('/offers', this.offerController.router);
  }

  private async initMiddleware() {
    const authMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(express.json());
    this.server.use(
      STATIC_UPLOAD_ROUTE,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(
      STATIC_FILES_ROUTE,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.server.use(authMiddleware.execute.bind(authMiddleware));
    this.server.use(cors());
  }

  private async initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info(APP_LOGS.INIT);
    this.logger.info(APP_LOGS.INIT_DB);
    await this.initDb();
    this.logger.info(APP_LOGS.INIT_DB_COMPLETED);

    this.logger.info(APP_LOGS.INIT_MIDDLEWARE);
    await this.initMiddleware();
    this.logger.info(APP_LOGS.INIT_MIDDLEWARE_COMPLETED);

    this.logger.info(APP_LOGS.INIT_CONTROLLERS);
    await this.initControllers();
    this.logger.info(APP_LOGS.INIT_CONTROLLERS_COMPLETED);

    this.logger.info(APP_LOGS.INIT_EXCEPTION_FILTER);
    await this.initExceptionFilters();
    this.logger.info(APP_LOGS.INIT_EXCEPTION_FILTER_COMPLETED);

    this.logger.info(APP_LOGS.INIT_SERVER);
    await this.initServer();
    this.logger.info(
      APP_LOGS.INIT_SERVER_COMPLETED.replace(
        '{ path }',
        `${ getFullServerPath(this.config.get('HOST'), this.config.get('PORT'), false) }`));
  }
}
