export class Page {
  constructor(state, rerender) {
    this.state = state;
    this.rerender = rerender;
  }

  render() {
    throw new Error(`Method 'render()' must be implemented`);
  }

  mount() {
  }

  unmount() {
  }

  set(state) {
    this.state = state;
    this.rerender();
  }
}
