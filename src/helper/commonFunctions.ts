import { compare } from 'bcrypt';

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(min + Math.random() * max);
}

export async function comparePassword(password: string, hash: string) {
  return await compare(password, hash);
}

export function compareNumber(number: number, comparisonNumber: number) {
  return number === comparisonNumber;
}
