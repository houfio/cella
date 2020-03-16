import { CategoryController } from './controllers/CategoryController';
import { CreateController } from './controllers/CreateController';
import { HomeController } from './controllers/HomeController';
import { NotFoundController } from './controllers/NotFoundController';
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
  current.refs = renderElement(view.render(), roots[roots.length - 1]);

  if (mount) {
    current.mount();
  }

  current.update();
}

function renderElement(element, container) {
  let refs = {};

  if (Array.isArray(element)) {
    return {
      ...refs,
      ...element.reduce((previous, current) => ({
        ...previous,
        ...renderElement(current, container)
      }), {})
    };
  } else if (typeof element.type === 'function') {
    return renderElement(new element.type(element.props).render(), container);
  }

  const dom = element.type === 'cella-text' ? document.createTextNode('') : document.createElement(element.type);

  for (const key of Object.keys(element.props).filter(not('children'))) {
    if (key === 'id') {
      refs[element.props[key]] = dom;
    }

    dom[key.startsWith('on') ? key.toLowerCase() : key] = element.props[key];
  }

  refs = {
    ...refs,
    ...element.props.children.reduce((previous, current) => ({
      ...previous,
      ...renderElement(current, dom)
    }), {})
  };

  container.appendChild(dom);

  return refs;
}

navigate.subscribe(render);
window.addEventListener('popstate', render);
window.addEventListener('load', render);
