import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { Wizard } from './pages/Wizard';
import './index.scss';

let current;
const routes = [
  [/^\/$/, Home],
  [/^\/category\/(?<name>[\w]+)$/, Category],
  [/^\/category\/(?<name>[\w]+)\/create$/, Wizard]
];

function render() {
  current?.unmount();

  for (const [route, page] of routes) {
    const match = window.location.pathname.match(route);

    if (!match) {
      continue;
    }

    current = new page(match.groups || {}, rerender);

    rerender(true);
  }
}

function rerender(mount = false) {
  if (!current) {
    return;
  }

  document.body.innerHTML = current.render();

  if (mount) {
    current.mount();
  }

  current.update();
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);
