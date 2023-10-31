import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';
import { createRestApplicationContainer } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createReviewContainer } from './shared/modules/review/index.js';
import { createFavoriteContainer } from './shared/modules/favorite/index.js';
import { createAuthContainer } from './shared/modules/auth/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createFavoriteContainer(),
    createReviewContainer(),
    createAuthContainer(),
  );

  const app = appContainer.get<RestApplication>(Component.RestApplication);
  await app.init();
}

bootstrap();
