import { TCity } from './shared/types/city.type.js';
import { City } from './shared/types/city.enum.js';
export const GENERATOR_VALUES = {
  MIN_PRICE: 100,
  MAX_PRICE: 1000,
  MIN_BEDROOMS: 1,
  MAX_BEDROOMS: 8,
  MIN_ADULTS: 1,
  MAX_ADULTS: 10,
  FIRST_WEEK_DAY: 1,
  LAST_WEEK_DAY: 7,
};
export const CITIES: Record<City, TCity> = {
  [ City.Paris ]: {
    name: City.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
    }
  },
  [ City.Cologne ]: {
    name: City.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
    }
  },
  [ City.Brussels ]: {
    name: City.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
    }
  },
  [ City.Amsterdam ]: {
    name: City.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
    }
  },
  [ City.Hamburg ]: {
    name: City.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
    }
  },
  [ City.Dusseldorf ]: {
    name: City.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
    }
  },
} as const;
export const DEFAULT_CONTENT_TYPE = 'application/json';
