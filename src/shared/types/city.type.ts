import { TLocation } from './location.type.js';
import { City } from './city.enum.js';

export type TCity = {
  name: City;
  location: TLocation;
}
