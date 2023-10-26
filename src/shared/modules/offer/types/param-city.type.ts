import { City } from '../../../types/city.enum.js';
import { ParamsDictionary } from 'express-serve-static-core';

export type ParamCity = { city: City } | ParamsDictionary;
