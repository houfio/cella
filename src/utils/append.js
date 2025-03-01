import { not } from './not';

export function append(element, container) {
  let refs = {};

  if (Array.isArray(element)) {
    return {
      ...refs,
      ...element.reduce((previous, current) => ({
        ...previous,
        ...append(current, container)
      }), {})
    };
  } else if (typeof element.type === 'function') {
    return append(new element.type(element.props).render(), container);
  }

  const dom = element.type === 'cella-text' ? document.createTextNode('') : document.createElement(element.type);

  for (const key of Object.keys(element.props).filter(not('children'))) {
    if (key === 'id') {
      refs[element.props[key]] = dom;
    }

    if (key.startsWith('on')) {
      dom.addEventListener(key.substr(2).toLowerCase(), element.props[key]);
    } else if (key.startsWith('data-')) {
      dom.setAttribute(key, element.props[key]);
    } else {
      dom[key] = element.props[key];
    }
  }

  refs = {
    ...refs,
    ...element.props.children.reduce((previous, current) => ({
      ...previous,
      ...append(current, dom)
    }), {})
  };

  container.appendChild(dom);

  return refs;
}
