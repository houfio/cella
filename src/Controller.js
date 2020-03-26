import produce from 'immer';

export class Controller {
  static get route() {
    throw new Error('Method \'route()\' must be implemented');
  }

  #model;
  #rerender;
  refs = {};

  constructor(params, rerender) {
    const cls = this.initial();

    this.#model = new cls(params);
    this.#rerender = rerender;
  }

  get model() {
    return this.#model;
  }

  view() {
    throw new Error('Method \'view()\' must be implemented');
  }

  initial() {
    throw new Error('Method \'initial()\' must be implemented');
  }

  mount() {
  }

  update() {
  }

  unmount() {
  }

  set(fn, refresh = true) {
    const current = this.model;

    this.#model = produce(current, fn);

    if (refresh && current !== this.model) {
      this.#rerender();
    }
  }
}
