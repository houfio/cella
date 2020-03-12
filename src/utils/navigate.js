export function navigate(url) {
  window.history.pushState(null, null, url);

  for (const listener of navigate.listeners) {
    listener(window.location.pathname);
  }
}

navigate.subscribe = (listener) => {
  navigate.listeners = [
    ...navigate.listeners || [],
    listener
  ];
};
