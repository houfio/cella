import equal from 'fast-deep-equal/es6';

export class Page {
  #rerender;

  constructor(params, rerender) {
    this.state = this.initial(params);
    this.#rerender = rerender;
  }

  initial(params) {
    return params;
  }

  render() {
    throw new Error(`Method 'render()' must be implemented`);
  }

  mount() {
  }

  unmount() {
  }

  set(state, mandatory = true) {
    const current = this.state;

    this.state = state;

    if (mandatory && !equal(current, this.state)) {
      this.#rerender();
    }
  }
}
