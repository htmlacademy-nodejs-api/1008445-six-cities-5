export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const start = generateRandomValue(0, items.length - 1);
  const end = start + generateRandomValue(start, items.length);
  return items.slice(start, end);
}

export function getRandomItem<T>(items: T[]):T {
  return items[ generateRandomValue(0, items.length - 1) ];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
