import 'reflect-metadata';
import { PinoLogger, ILogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/rest.application.js';
import { RestConfig, IConfig, TRestSchema } from './shared/libs/config/index.js';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<IConfig<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const app = container.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
