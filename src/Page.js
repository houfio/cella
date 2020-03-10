export class Page {
  #rerender;

  constructor(state, rerender) {
    this.state = state;
    this.#rerender = rerender;
  }

  render() {
    throw new Error(`Method 'render()' must be implemented`);
  }

  mount() {
  }

  update() {
  }

  unmount() {
  }

  set(state, mandatory = true) {
    this.state = state;

    if (mandatory) {
      this.#rerender();
    }
  }
}
