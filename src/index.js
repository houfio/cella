import { Home } from './pages/Home';
import { Category } from './pages/Category';
import './index.scss';
import { Wizard } from "./pages/Wizard";

let current;
const routes = [
  [/^\/$/, Home],
  [/^\/category\/(?<name>[\w]+)$/, Category],
  [/^\/wizard\/(?<name>[\w]+)$/, Wizard]
];

function render() {
  current?.unmount();

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
