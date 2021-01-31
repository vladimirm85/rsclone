export default function getRandomValue(min: number, max: number): number {
  return +(Math.random() * (max - min + 1) + min).toFixed(2);
}
