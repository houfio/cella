import { CategoryController } from './controllers/CategoryController';
import { CreateController } from './controllers/CreateController';
import { HomeController } from './controllers/HomeController';
import { NotFoundController } from './controllers/NotFoundController';
import { append } from './utils/append';
import { navigate } from './utils/navigate';
import { not } from './utils/not';
import './index.scss';

let roots = [];
let current;
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

  const cls = current.view();
  const view = new cls(current);

  if (mount) {
    const root = document.createElement('div');
    root.className = 'root';

    document.body.appendChild(root);

    for (const oldRoot of roots) {
      oldRoot.className += ' old';
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

  roots[roots.length - 1].innerHTML = '';
  current.refs = append(view.render(), roots[roots.length - 1]);

  if (mount) {
    current.mount();
  }

  current.update();
}

navigate.subscribe(render);
window.addEventListener('popstate', render);
window.addEventListener('load', render);
