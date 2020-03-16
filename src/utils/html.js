export function html(type, props, ...children) {
  if (type === 'cella-fragment') {
    return mapChildren(children);
  }

  return {
    type,
    props: {
      ...props,
      children: mapChildren(children)
    }
  };
}

function mapChildren(children) {
  return children.map((child) => typeof child === 'object' ? child.type === 'cella-fragment' ? mapChildren(child.props.children) : child : {
    type: 'cella-text',
    props: {
      nodeValue: child,
      children: []
    }
  });
}
