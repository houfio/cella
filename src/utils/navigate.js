export function navigate(url) {
  window.history.pushState(null, null, url);

  for (const listener of navigate.listeners) {
    listener();
  }
}

navigate.subscribe = (listener) => {
  navigate.listeners = [
    ...navigate.listeners || [],
    listener
  ];
};
