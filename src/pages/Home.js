import { Page } from '../Page';

export class Home extends Page {
  render() {
    return `
      <span>
        ${this.state.count}
      </span>
    `;
  }

  mount() {
    this.increase();
  }

  unmount() {
    clearTimeout(this.timeout);
  }

  increase = () => {
    this.set({
      count: (this.state.count || 0) + 1
    });

    this.timeout = setTimeout(this.increase, 1000);
  };
}
