import { CategoryController } from './controllers/CategoryController';
import { CreateController } from './controllers/CreateController';
import { HomeController } from './controllers/HomeController';
import { NotFoundController } from './controllers/NotFoundController';
import { navigate } from './utils/navigate';
import { not } from './utils/not';
import './index.scss';

let roots = [];
let history = {};
let current;
const event = /on(?<event>[a-z]+)="(?<fn>[a-zA-Z]+)"/g;
const controllers = [
  HomeController,
  CategoryController,
  CreateController,
  NotFoundController
];

function render(direction) {
  current?.unmount();

  for (const controller of controllers) {
    const match = window.location.pathname.match(controller.route);

    if (!match) {
      continue;
    }

    current = new controller(match.groups || {}, rerender);

    rerender(true, direction);

    break;
  }
}

function rerender(mount = false, direction) {
  if (!current) {
    return;
  }

  let events = [];
  const cls = current.view();
  const view = new cls(current);

  if (mount) {
    const root = document.createElement('div');
    root.className = `root${direction ? ` ${direction}` : ''}`;

    document.body.appendChild(root);

    for (const oldRoot of roots) {
      oldRoot.className = `root ${direction} old`;
    }

    roots = [
      ...roots,
      root
    ];

    if (roots.length > 1) {
      const first = roots[roots.length - 2];

      first.addEventListener('animationend', () => {
        document.body.removeChild(first);

        roots = roots.filter(not(first));
      });
    }
  }

  roots[roots.length - 1].innerHTML = view.render().replace(event, (full, event, action) => {
    const id = `data-event-${events.length}`;

    events = [
      ...events,
      [id, event, action]
    ];

    return id;
  });

  for (const [id, event, action] of events) {
    const element = document.querySelector(`[${id}]`);

    element.addEventListener(event, current[action]);
    element.removeAttribute(id);
  }

  if (mount) {
    current.mount();
  }
}

navigate.subscribe((id, direction) => {
  history[id] = direction;

  render(direction);
});
window.addEventListener('popstate', (event) => render(history[event.data]));
window.addEventListener('load', render);
