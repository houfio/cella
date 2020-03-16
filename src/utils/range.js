export function range(min, max) {
  let result = [];

  for (let i = min; i < max; i++) {
    result = [
      ...result,
      i
    ];
  }

  return result;
}
