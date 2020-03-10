import { Home } from './pages/Home';
import { Category } from './pages/Category';

let current;
const routes = [
  [/^\/$/, Home],
  [/^\/category\/(?<id>[\w]+)$/, Category]
];

function render() {
  if (current) {
    current.unmount();
  }

  for (const [route, page] of routes) {
    const match = window.location.pathname.match(route);

    if (!match) {
      continue;
    }

    current = new page(match.groups || {}, rerender);

    rerender();
    current.mount();
  }
}

function rerender() {
  if (current) {
    document.body.innerHTML = current.render();
  }
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);
