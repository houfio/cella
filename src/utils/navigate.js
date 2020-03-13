import { generate } from 'shortid';
import { count } from './count';

export function navigate(url) {
  const direction = count('/', window.location.pathname) > count('/', url) ? 'backwards' : 'forwards';
  const id = generate();
  window.history.pushState(id, null, url);

  for (const listener of navigate.listeners) {
    listener(id, direction);
  }
}

navigate.subscribe = (listener) => {
  navigate.listeners = [
    ...navigate.listeners || [],
    listener
  ];
};
