export function count(char, str) {
  return Array.from(str, (c) => c === char).length;
}
