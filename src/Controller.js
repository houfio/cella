import equal from 'fast-deep-equal/es6';

export class Controller {
  static get route() {
    throw new Error('Method \'route()\' must be implemented');
  }

  #rerender;

  constructor(params, rerender) {
    this.state = this.initial(params);
    this.#rerender = rerender;
  }

  view() {
    throw new Error('Method \'view()\' must be implemented');
  }

  initial(params) {
    return params;
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
