export function getRandomInt(min: number, max: number): number {
  const randInt = Math.floor(Math.random() * (max - min)) + min
  return randInt === max ? randInt - 1 : randInt
}
