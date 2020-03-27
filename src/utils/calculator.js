export function calculate(lValue, rValue, operator) {
  let value;

  switch (operator) {
  case 'x':
    value = lValue * rValue;
    break;
  case '+':
    value = lValue + rValue;
    break;
  case '/':
    value = lValue / rValue;
    break;
  default:
    value = lValue - rValue;
    break;
  }

  return value;
}
