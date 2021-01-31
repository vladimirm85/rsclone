export const getTouchOffset = (touchX: number, x: number, width: number) => {
  const diff = x + width - touchX;
  const offset = width - diff;
  const result = (2 * offset) / width;
  return result - 1;
};
