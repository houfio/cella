import { CategoryController } from './controllers/CategoryController';
import { CreateController } from './controllers/CreateController';
import { HomeController } from './controllers/HomeController';
import { NotFoundController } from './controllers/NotFoundController';
import { navigate } from './utils/navigate';
import './index.scss';

let current;
const event = /on(?<event>[a-z]+)="(?<fn>[a-zA-Z]+)"/g;
const controllers = [
  HomeController,
  CategoryController,
  CreateController,
  NotFoundController
];

function render() {
  current?.unmount();

  for (const controller of controllers) {
    const match = window.location.pathname.match(controller.route);

    if (!match) {
      continue;
    }

    current = new controller(match.groups || {}, rerender);

    rerender(true);

    break;
  }
}

function rerender(mount = false) {
  if (!current) {
    return;
  }

  let events = [];
  const cls = current.view();
  const view = new cls(current);

  document.body.innerHTML = view.render().replace(event, (full, event, action) => {
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
}

navigate.subscribe(render);
window.addEventListener('popstate', render);
window.addEventListener('load', render);
