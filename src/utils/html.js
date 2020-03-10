export function html(strings, ...variables) {
  let result = '';

  for (let i = 0; i < variables.length; i++) {
    result += strings[i];

    let dynamic = variables[i];

    if (Array.isArray(dynamic)) {
      dynamic.forEach(console.log);
      dynamic = dynamic.filter(Boolean).join('');
    }

    if (dynamic) {
      result += dynamic;
    }
  }

  result += strings[strings.length - 1];

  return result;
}
