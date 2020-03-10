import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { Wizard } from './pages/Wizard';
import { Categories } from './pages/Categories';
import { navigate } from './utils/navigate';
import './index.scss';

let current;
const event = /on(?<event>[a-z]+)="(?<fn>[a-zA-Z]+)"/g;
const routes = [
  [/^\/$/, Home],
  [/^\/categories$/, Categories],
  [/^\/categories\/(?<name>[\w]+)$/, Category],
  [/^\/categories\/(?<name>[\w]+)\/create$/, Wizard]
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

  let events = [];

  document.body.innerHTML = current.render().replace(event, (full, event, action) => {
    const id = `data-event-${events.length}`;

    events = [
      ...events,
      [id, event, action]
    ];

    return id;
  });

  for (const [id, event, action] of events) {
    const element = document.querySelector(`[${id}]`);

    element.addEventListener(event, () => current[action](element));
    element.removeAttribute(id);
  }

  if (mount) {
    current.mount();
  }

  current.update();
}

navigate.subscribe(render);
window.addEventListener('popstate', render);
window.addEventListener('load', render);
