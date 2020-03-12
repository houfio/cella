export class View {
  #controller;

  constructor(controller) {
    this.#controller = controller;
  }

  get controller() {
    return this.#controller;
  }

  render() {
    throw new Error(`Method 'render()' must be implemented`);
  }
}
