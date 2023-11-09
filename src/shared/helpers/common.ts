import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ApplicationError, ValidationErrorField } from '../libs/rest/index.js';

export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const start = generateRandomValue(0, items.length - 1);
  const end = start + generateRandomValue(start, items.length);
  return items.slice(start, end);
}

export function getRandomItemsValue<T>(items: T[], min:number, max: number):T[] {
  const start = min <= items.length ? min : items.length - 1;
  const end = min + generateRandomValue(min, max <= items.length ? max : items.length);
  return items.slice(start, end);
}

export function getRandomItem<T>(items: T[]):T {
  return items[ generateRandomValue(0, items.length - 1) ];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}

export function getFullServerPath(host: string, port: number, isUseSSL: boolean) {
  return `${ isUseSSL ? 'https' : 'http' }://${ host }:${ port }`;
}
